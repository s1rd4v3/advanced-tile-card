# Advanced Tile Card for Lovelace

> In the mean time, Home Assistant added a great tile card on their own. But this didn't existed when I first started this project.

News:

- Home Assistant added grid and drag'n'drop support with the latest release v2024.03. I now added support for the grid as well so the Advanced Tile Card can be used via drag'n'drop and I've added support to control the columns and rows a card uses within the 4x4 grid.

![CleanShot 2024-03-12 at 15 58 11@2x](https://github.com/s1rd4v3/advanced-tile-card/assets/914248/5b77bd13-4aaf-4d3c-a813-79f541c9355b)

### Experience

- Use with the theme [`Gugg Iis`](https://github.com/s1rd4v3/gugg-iis-theme) to have a clean and simple theme
- Use in a "Sections" type view so you can control the columns and rows. (No effect on other view types)

**Take a look at me matching theme for this custom card at [gugg-iis-theme](https://github.com/s1rd4v3/gugg-iis-theme)**

[TBD]

## Features

- Add custom actions for icon taps and default card taps
- Custom Name
- Custom Icon
- Entities with pictures (like camera, person or media_players) can add the picture to the icon or to the background
- State string can be rendered conditionally
  - Entity attribute can be used instead of state string (like `media_title` for `media_player` domain) _Example: Only show the state text if a media_player has state "playing"_
- View Type: Sections
  - Use the new drag'n'drop functionality Home Assistant introduced with v2024.3
  - Makes use of the grid system but enhanced from 2/2 to a 4/4 grid to have more control
- Theming ready with many exposed CSS variables

## Installation via HACS

> Will try to add this card directly to hacs for easier installation in the future

HACS installation: Go to the hacs store and add a custom repo url https://github.com/s1rd4v3/advanced-tile-card to install.
After you've installed the card, you will find it in the card selection while edition a lovelace view.

## Next up

- [ ] Possibility to add additional state bubble to the top right similar to [hass-config](https://github.com/matt8707/hass-config)?
- [ ] Square cards
- [ ] CSS optimisations
- ...
