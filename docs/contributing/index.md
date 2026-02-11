---
sidebar_position: 1
---

# Contributing to Superdesk

Thank you for your interest in contributing to Superdesk! This guide will help you get started with contributing to the project.

## Ways to Contribute

There are many ways to contribute to Superdesk:

- **Report Bugs**: Help us identify and fix issues
- **Suggest Features**: Propose new features or improvements
- **Write Documentation**: Improve guides, tutorials, and API docs
- **Submit Code**: Fix bugs or implement new features
- **Review Pull Requests**: Help review contributions from others
- **Answer Questions**: Help other users on GitHub Discussions

## Getting Started

### 1. Choose a Repository

Superdesk consists of multiple repositories:

- **[superdesk-core](https://github.com/superdesk/superdesk-core)**: Python backend
- **[superdesk-client-core](https://github.com/superdesk/superdesk-client-core)**: TypeScript/React frontend
- **[superdesk-planning](https://github.com/superdesk/superdesk-planning)**: Planning module
- **[superdesk](https://github.com/superdesk/superdesk)**: Main deployment repository
- **[superdesk-docs](https://github.com/superdesk/superdesk-docs)**: Documentation

### 2. Set Up Development Environment

Follow the setup guide for the repository you want to contribute to:
- [Backend Setup](/docs/developer-guide/core)
- [Frontend Setup](/docs/developer-guide/client)
- [Planning Setup](/docs/developer-guide/planning)

### 3. Find an Issue

Look for issues labeled:
- `good first issue`: Great for newcomers
- `help wanted`: Community contributions welcome
- `bug`: Bug fixes needed
- `enhancement`: New features or improvements

## Code Contribution Process

### 1. Fork and Clone

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/superdesk-core.git
cd superdesk-core

# Add upstream remote
git remote add upstream https://github.com/superdesk/superdesk-core.git
```

### 2. Create a Branch

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create a feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/issue-description
```

### 3. Make Changes

- Write clear, readable code
- Follow the project's coding style
- Add tests for your changes
- Update documentation if needed
- Keep commits focused and atomic

### 4. Test Your Changes

**Backend (Python):**
```bash
# Run tests
pytest

# Run specific test
pytest apps/archive/archive_test.py

# Check code style
flake8
black --check .
```

**Frontend (TypeScript/React):**
```bash
# Run tests
npm test

# Run linter
npm run lint

# Type check
npm run typecheck
```

### 5. Commit Your Changes

Follow conventional commit format:

```bash
git add .
git commit -m "feat: add new feature description"
# or
git commit -m "fix: resolve issue with X"
# or
git commit -m "docs: update installation guide"
```

Commit types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### 6. Push and Create Pull Request

```bash
# Push your branch
git push origin feature/your-feature-name

# Create a pull request on GitHub
# Provide a clear description of your changes
```

### Pull Request Guidelines

Your PR description should include:

1. **What**: Brief description of the change
2. **Why**: Reason for the change
3. **How**: Technical approach used
4. **Testing**: How you tested the changes
5. **Screenshots**: For UI changes
6. **Related Issues**: Link to related issues

Example:

```markdown
## Description
Adds user avatar upload functionality

## Motivation
Users requested the ability to customize their profile with avatars

## Changes
- Added avatar upload endpoint in backend
- Created avatar upload component in frontend
- Updated user profile page
- Added tests for avatar upload

## Testing
- Tested avatar upload with various image formats
- Verified file size limits
- Tested error handling for invalid files
- All tests pass

## Screenshots
[Include screenshots for UI changes]

## Related Issues
Closes #123
```

## Code Style Guidelines

### Python (Backend)

Follow PEP 8 and project conventions:

```python
# Good
def get_article_by_id(article_id: str) -> dict:
    """
    Retrieve an article by its ID.
    
    :param article_id: The article identifier
    :return: Article document
    """
    return get_resource_service('archive').find_one(req=None, _id=article_id)

# Use type hints
# Write docstrings
# Keep functions focused
# Use meaningful variable names
```

### TypeScript/React (Frontend)

Follow TypeScript and React best practices:

```typescript
// Good
interface IArticleProps {
    article: IArticle;
    onSave: (article: IArticle) => void;
}

export const ArticleComponent: React.FC<IArticleProps> = ({article, onSave}) => {
    const [headline, setHeadline] = useState(article.headline);
    
    const handleSave = () => {
        onSave({...article, headline});
    };
    
    return (
        <div className="article">
            <input 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
            />
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

// Use TypeScript interfaces
// Functional components with hooks
// Clear prop types
// Meaningful component names
```

### General Guidelines

1. **Naming Conventions**
   - Use descriptive names
   - Be consistent with existing code
   - Avoid abbreviations unless common

2. **Comments**
   - Write self-documenting code
   - Comment complex logic
   - Keep comments up to date
   - Use docstrings for functions

3. **Testing**
   - Write tests for new features
   - Update tests when changing behavior
   - Aim for good test coverage
   - Test edge cases

4. **Documentation**
   - Update README if needed
   - Document new APIs
   - Add examples for complex features
   - Keep docs in sync with code

## Testing Guidelines

### Backend Testing

```python
# apps/archive/archive_test.py
def test_create_article(client):
    """Test article creation."""
    article = {
        'headline': 'Test Article',
        'body_html': '<p>Content</p>',
        'type': 'text'
    }
    
    response = client.post('/archive', json=article)
    assert response.status_code == 201
    assert response.json['headline'] == 'Test Article'

def test_article_validation(client):
    """Test article validation."""
    article = {'body_html': '<p>Content</p>'}  # Missing required headline
    
    response = client.post('/archive', json=article)
    assert response.status_code == 400
```

### Frontend Testing

```typescript
// ArticleEditor.spec.tsx
import {render, screen, fireEvent} from '@testing-library/react';
import {ArticleEditor} from './ArticleEditor';

describe('ArticleEditor', () => {
    it('renders with initial article data', () => {
        const article = {headline: 'Test Headline'};
        render(<ArticleEditor article={article} onSave={jest.fn()} />);
        
        expect(screen.getByDisplayValue('Test Headline')).toBeInTheDocument();
    });
    
    it('calls onSave with updated article', () => {
        const onSave = jest.fn();
        const article = {headline: 'Original'};
        
        render(<ArticleEditor article={article} onSave={onSave} />);
        
        const input = screen.getByDisplayValue('Original');
        fireEvent.change(input, {target: {value: 'Updated'}});
        fireEvent.click(screen.getByText('Save'));
        
        expect(onSave).toHaveBeenCalledWith(
            expect.objectContaining({headline: 'Updated'})
        );
    });
});
```

## Documentation Contributions

Improving documentation is a valuable contribution:

1. **Fix Typos and Errors**: Correct mistakes in existing docs
2. **Improve Clarity**: Make explanations clearer
3. **Add Examples**: Provide code examples
4. **Fill Gaps**: Document undocumented features
5. **Update Outdated Info**: Keep docs current

Documentation repository: [superdesk-docs](https://github.com/superdesk/superdesk-docs)

## Review Process

After submitting a PR:

1. **Automated Checks**: CI will run tests and linters
2. **Code Review**: Maintainers will review your code
3. **Feedback**: Address any requested changes
4. **Approval**: Once approved, your PR will be merged

Be patient and responsive to feedback. Reviews help maintain code quality.

## Community Guidelines

- Be respectful and professional
- Help others when you can
- Accept constructive feedback
- Follow the code of conduct
- Ask questions if unsure

## Getting Help

If you need help:

- **Documentation**: Check this documentation site
- **GitHub Issues**: Ask questions on relevant repositories
- **Discussions**: Use GitHub Discussions for broader questions
- **Code Review**: Ask for feedback on your approach before implementing large changes

## Recognition

Contributors are recognized in:
- Git commit history
- Release notes
- Contributors list in repositories

Thank you for contributing to Superdesk! 🎉

## Next Steps

- [Developer Guide](/docs/developer-guide/architecture)
- [API Reference](/docs/api)
- [Getting Started](/docs/getting-started/intro)
