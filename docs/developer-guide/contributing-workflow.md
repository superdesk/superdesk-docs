---
sidebar_position: 1
---

# Contribution Workflow

This guide covers the end-to-end workflow for contributing code and documentation across Superdesk repositories.

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

## Pull Request Guidelines

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
