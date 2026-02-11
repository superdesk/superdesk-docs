---
sidebar_position: 2
---

# AngularJS Performance Tips

This document contains various AngularJS performance tips and the rationale behind them.

:::info
These tips are specifically for the legacy AngularJS parts of Superdesk. Modern React components should follow React best practices.
:::

## Avoid unnecessary DOM manipulations in ng-repeat with `track by`

Consider a common scenario, when you retrieve a bunch of items from the server and list them on the screen:

```javascript
// inside a controller
$scope.searchResults = SearchService.findItems(...);
```

Template:

```html
<div ng-repeat="item in searchResults">
  <h3>{{item.title}}</h3>
  <p>{{item.description}}</p>
</div>
```

Behind the scenes, Angular needs to link the DOM nodes with the items in the collection (searchResults in our case) and for that it needs to distinguish between those items. It does that by adding a special property called `$$hashKey` to each of the items. `$$hashKeys` are unique (they are basically calculated by simply using an auto-incrementing counter).

Now what happens if we submit a new search query and retrieve a new set of items from the server?

Well, the resulting array gets assigned to the `searchResults` variable, Angular calculates `$$hashKeys` for the newly retrieved items, and then it creates new DOM nodes inside of `ng-repeat` and links them to these new items (the old DOM nodes are, of course, destroyed).

**The problem:** The DOM nodes are destroyed and then re-created even if the new result set contains the same items as before! Since DOM manipulation is a costly operation, this behavior is clearly undesired. Angular doesn't really know that it has received the same items, because their `$$hashKeys` are different (it's an auto-incrementing counter, remember?).

**The solution:** We need to tell Angular which items are, in fact, the same, so that it won't be unnecessarily re-creating DOM elements for them. We do that by adding a `track by` expression to `ng-repeat`:

```html
<div ng-repeat="item in searchResults track by item.id">
  <h3>{{item.title}}</h3>
  <p>{{item.description}}</p>
</div>
```

Now Angular knows that it can distinguish items by their id property instead of relying on computed `$$hashKey` values. It's especially important to use `track by` if your list of items is long and/or the HTML you create for each item is complicated.

The difference in performance can be significant, see a demo here: http://jsfiddle.net/SeKk7/

:::note
If you don't see a difference, try changing the value in the for loop to 3001... also don't forget to hit the Run button again to load the changed code.
:::

Track by was added in Angular 1.2.

## Use one-time bindings wherever possible

One of the biggest bottlenecks in Angular is its digest loop. Have you ever wondered how Angular automagically knows when a value has changed and updates the UI?

The answer is dirty checking. Angular has a list of values to watch and every now and then it fires a digest cycle (e.g. when you call `scope.$apply()`). In this cycle it compares the remembered values with the current values of objects, variables etc. that it watches. If it detects that any of these values have changed, it triggers the corresponding change handlers.

Most of the time, Angular adds values to its watch list automatically, e.g. every time it encounters `{{expression}}` in a template or when you use a directive (ng-show="someCondition"), but also adds watches when you explicitly instruct it to do so (`scope.$watch(...)`).

Checking values for changes takes some time and if there are too many values to watch, the applications starts to become laggy. A rule of thumb is to never have more than 2000 watches at the same time and make sure that all onChange callbacks execute quickly.

**The problem:** A lot of values actually never change once they have been brought to the template (e.g. page title, item IDs, etc.) Angular still checks them again and again in every digest loop.

**The solution:** Tell Angular NOT to check the values that you know will never change. Use one-time bindings (available since Angular 1.3).

The usage is as simple as prefixing an angular expression with a double colon (`::`):

```html
<ul ng-repeat="role in ::userRoles">
  <li>{{::role.id}} {{::role.name}}</li>
</ul>
```

:::note
Here we assume that the userRoles list never changes during a single page load - if that wasn't true, we would have to remove the double colon in the `ng-repeat` expression.
:::

## Use ng-model-options where applicable

Did you know that Angular 1.3 brought the `ng-model-options` directive? It allows you to manipulate how changes in the UI are propagated to the rest of the application.

Imagine, for instance, that you have a live search textbox on your page. As users are typing in their search phrase, you send a request to the server on the fly and display them the results.

```html
<input
  ng-model="searchPhrase"
  ng-change="getResults(searchPhrase)"></input>
```

**The problem:** if a user types "banana" into the search field, SIX search queries will be sent to the server ("b", "ba", "ban", "bana", "banan", "banana"). This is a considerable overhead, since it would be enough to just send the last search query ("banana").

**The solution:** defer the change event by using `ng-model-options`. Example:

```html
<input
  ng-model="searchPhrase"
  ng-model-options="{debounce: 500}"
  ng-change="getResults(searchPhrase)"></input>
```

Now a change is triggered only after a 500 milliseconds delay, i.e. when at least 500 milliseconds have elapsed since the last change of the text field's content (most likely because the user has now finished typing).

You can do other stuff with `ng-model-options` as well, such as limiting the model change event to trigger only on specific javascript events, e.g. on blur, but not on keypress. More about that in the [ng-model-options](https://code.angularjs.org/1.3.14/docs/api/ng/directive/ngModelOptions/) documentation.

## Understanding the difference between ng-show and ng-if

In order to conditionally show a piece of content to a user, Angular provides `ng-if` and `ng-show` (and its counterpart `ng-hide`). But even though they seem to achieve the same effect, they do it in a different way:

* `ng-hide="condition"` uses CSS styling to hide an element if condition is not a truthy value. Note that even if an element is hidden, it is still present in the DOM, thus all expressions on it and its sub-elements still get evaluated on every $digest cycle.

* `ng-if="condition"` removes an element from the DOM entirely, along with all the $watches bound to it.

Thus, if you don't need a part of the page (yet), it's better not to have it in the DOM in the first place in order to avoid unnecessary checks in the digest loop. It doesn't make much sense to evaluate the expressions if they are not shown to the user anyway, thus it's better to use `ng-if`.

**An exception:** That said, there are times when using `ng-show` has its merits. For example if you use it to toggle an element, it's actually better to show/hide it using CSS styles (read: `ng-show`) instead of removing and re-creating an entire DOM element on every toggle action (which is what `ng-if` would do). Use your judgement to decide which of the two is more suitable in a particular use case.

## Avoid (ab)using filters in templates

:::info Update
Filters in Angular 1.3 have been revamped and are assumed to be _stateless_ by default, i.e. their result depends only on the input parameters and not on any kind of internal state. If the input to a filter does not change, the filter yields the same result as well. Angular uses this fact and does not invoke a (stateless) filter in every $digest cycle anymore, unless it detects that its input value and/or parameters have changed.

A filter can be marked as stateful by setting its `$stateful` flag to `true`, e.g. `myFilterFunc.$stateful = true;`
:::

However, for Angular versions prior to 1.3 and for _stateful_ filters, one needs to be aware of the impacts on the $digest cycle's execution time. Let's see why.

Imagine a filter that displays the first 100 characters of every user's chosen email signature, with some potentially "bad" words filtered out, you know, just in case:

```html
<ul ng-repeat="user in userList">
  <li>{{user.signatureLine | stripWhitespace | censor | limitTo:100}}</li>
</ul>
```

**The problem:** These filters are evaluated again and again, at least *twice* per every digest cycle. This causes even more overhead on top of the dirty-checking of the value of `user.signatureLine` for changes. It is especially problematic if the filters applied are complex and time-consuming.

:::note
In every $digest cycle, the $digest loop runs at least twice - once as a response to an event that triggered the $digest cycle in the first place, and then at least once more to check if any of the "onModelChange" handlers have made additional model changes themselves.
:::

**The solution:** Instead of repeatedly filtering a value, pre-compute the filters and provide the already filtered value to the template:

```html
<ul ng-repeat="user in userList">
  <li>{{user.filteredSignature}}</li>
</ul>
```

You can access the filters programmatically by injecting and using the $filter service:

```javascript
shortenedText = $filter('limitTo')(originalText, 100);
```

## Consider using scope.$digest() instead of scope.$apply()

Sometimes things happen outside of Angular, but you still need to react on them. Think of "manually" modifying the DOM in your custom date picker directive, for example.

When a user selects a new date and you change the value of the corresponding text field, Angular by itself is not aware of that and does not update the parts of the UI that depend on the selected date. In cases like this you must explicitly tell Angular to run a $digest cycle and update the affected parts of the application. The usual way to do it is by calling `$scope.$apply()`.

The `$scope.$apply()` method first evaluates the given expression (if any) passed in as a parameter and then invokes `$rootScope.$digest()` which triggers a $digest cycle in the root scope and all of its child scopes.

**The problem:** In some cases, visiting all the scopes and checking them for changes is redundant, especially when a directive only updates some if its own $scope values not meant to be meaningful for any other scopes up in the scope hierarchy.

**The solution:** Call `$scope.$digest()` instead to only trigger $digest cycle in the current scope and its children, not in the whole scope tree.

Note that sometimes you, nevertheless, do need to call `$scope.apply()` instead of `$scope.$digest()`, for example in cases when there might be other scopes up in the hierarchy that might be listening to the changes in the current scope and reacting to them.

## The dreadful "$digest already in progress" error

You sooner or later stumble upon this one. It happens when you want to start a new $digest cycle (e.g. by calling `$scope.$apply()`) while one is already in progress. After some research you realize that you can circumvent the problem by using `$timeout(function() {...})`. The built-in `$timeout` service asynchronously executes your code at a later time and then, by default, automatically calls a new $digest cycle.

:::warning
Please **do NOT** use `if (!$scope.$$phase) $scope.$apply()` kind of stuff. It is considered an anti-pattern and should thus be avoided.
:::

While using `$timeout` is perfectly fine, `$scope.$evalAsync()` is even better. The reason is that `$evalAsync()` will try to execute your code *in the current $digest cycle* if one is already in progress and only trigger a new cycle if that is not the case. And voila, you just potentially saved one unnecessary $digest cycle, isn't that good?

## See Also

- [Main Client Documentation](/docs/developer-guide/client)
- [Architecture Overview](/docs/developer-guide/architecture)
- [Contributing Guidelines](/docs/contributing)
