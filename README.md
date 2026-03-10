# MineTrack - CS 7641 Machine Learning Project

[Project Source Code](https://github.gatech.edu/omediratta3/MineTrack)

## Quick Start for Team Members

### 1. Clone & Setup

```bash
git clone [your-repository-url]
cd MineTrack
```

### 2. Install VS Code Live Server Extension

1. **Open VS Code**
2. **Go to Extensions** (`Ctrl+Shift+X`)
3. **Search for "Live Server"** by Ritwick Dey
4. **Click Install**

### 3. Start Development

1. **Open the project folder** in VS Code
2. **Click 'Go Live'** → Should be in the bottom right on your VS Code status bar
3. **Your browser will open** with the website running locally
4. **Make changes** to any file and see them update automatically!

Alternative: Click the "Go Live" button in VS Code's bottom status bar.

## Website Structure

- **[index.html](index.html)** - Landing page with hero visual and navigation
- **[overview.html](overview.html)** - Main project content organized in panels  
- **[style.css](style.css)** - Styling with olive green theme and Minecraft font
- **[script.js](script.js)** - Interactive features and GitHub button
- **fonts/** - Custom Minecraft font files

## Making Changes

### Adding Project Content

**Replace placeholder text** in [overview.html](overview.html):
- Look for text in square brackets like `[Your content here]`
- Replace with actual project information
- Each section is in its own white panel for easy organization

### Adding Visuals

**For the hero section** ([index.html](index.html)):
1. Create an `images/` folder in the project
2. Add your research plots, GIFs, or videos
3. Find the `.plot-placeholder` div in `index.html`
4. Replace with:
   ```html
   <img src="images/your-plot.gif" alt="Research Visualization">
   ```

**For the overview page** ([overview.html](overview.html)):
- Add images anywhere using: `<img src="images/filename.png" alt="Description">`
- Use the `.visualization-placeholder` area for main results

### Setup GitHub Link

In [script.js](script.js):
1. Find: `const githubURL = 'https://github.com/yourusername/minetrack-project';`
2. Replace with your actual repository URL
3. Uncomment: `window.open(githubURL, '_blank');`
4. Remove the alert line

## GitHub Pages Deployment

### Automatic Deployment
1. **Push changes** to your main branch
2. **Go to repository Settings** → Pages
3. **Select Source**: "Deploy from a branch"
4. **Choose**: "main" branch, "/ (root)" folder  
5. **Click Save**

**Your site will be live at:** `https://[username].github.io/[repository-name]/`

### File Organization Rules
- Keep all HTML files in the root directory
- Put images in `images/` subfolder
- Put fonts in `fonts/` subfolder
- Use relative paths only (no absolute paths)
