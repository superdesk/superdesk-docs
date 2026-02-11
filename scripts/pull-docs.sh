#!/bin/bash

# Script to pull documentation from Superdesk repositories
# This script syncs README files and OpenAPI specs from various Superdesk repos

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
DOCS_DIR="$PROJECT_ROOT/docs"
STATIC_DIR="$PROJECT_ROOT/static"

echo "=== Superdesk Documentation Sync ==="
echo "Pulling documentation from Superdesk repositories..."

# Function to download a file from GitHub
download_file() {
    local repo=$1
    local file_path=$2
    local output_path=$3
    local branch=${4:-}

    local branches_to_try=()
    if [ -n "$branch" ]; then
        branches_to_try=("$branch")
    else
        branches_to_try=("main" "master")
    fi

    local success=0
    for b in "${branches_to_try[@]}"; do
        local url="https://raw.githubusercontent.com/superdesk/${repo}/${b}/${file_path}"

        echo "Downloading ${file_path} from ${repo} (branch: ${b})..."
        if curl -f -s -o "$output_path" "$url"; then
            echo "✓ Downloaded ${file_path} from branch ${b}"
            success=1
            break
        fi
    done

    if [ "$success" -ne 1 ]; then
        echo "✗ Failed to download ${file_path} from ${repo} (no matching branch found)"
    fi
}

# Create necessary directories
mkdir -p "$STATIC_DIR/openapi"

# Pull README files from repositories
echo ""
echo "=== Pulling README files ==="

# Placeholder: In the future, we can sync README files
# download_file "superdesk-core" "README.md" "$DOCS_DIR/developer-guide/core/README.md"
# download_file "superdesk-client-core" "README.md" "$DOCS_DIR/developer-guide/client/README.md"
# download_file "superdesk-planning" "README.md" "$DOCS_DIR/developer-guide/planning/README.md"

echo "README syncing not yet implemented - placeholder for future enhancement"

# Pull OpenAPI/Swagger specifications
echo ""
echo "=== Pulling OpenAPI Specifications ==="

# Placeholder: Once OpenAPI specs are available, download them
# download_file "superdesk-core" "docs/openapi.yaml" "$STATIC_DIR/openapi/superdesk-core.yaml"
# download_file "superdesk-planning" "docs/openapi.yaml" "$STATIC_DIR/openapi/superdesk-planning.yaml"

echo "OpenAPI spec syncing not yet implemented - placeholder for future enhancement"

# Placeholder: Sync additional documentation
echo ""
echo "=== Additional Documentation Sync ==="
echo "Additional documentation syncing not yet implemented - placeholder for future enhancement"

# TODO: Future enhancements
# - Pull and convert wiki pages
# - Sync API documentation
# - Pull code examples
# - Update version numbers
# - Pull changelog files

echo ""
echo "=== Documentation Sync Complete ==="
echo "✓ All available documentation has been synced"
echo ""
echo "Note: This script currently contains placeholders for future functionality."
echo "As documentation sources become available in the source repositories,"
echo "this script will be enhanced to automatically sync them."
