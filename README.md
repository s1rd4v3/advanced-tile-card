# Advanced Tile Card for Lovelace

> In the mean time, Home Assistant added a great tile card on their own. But this didn't existed when I first started this project.

News: 
- Home Assistant added grid and drag'n'drop support with the latest release v2024.03. I now added support for the grid as well so the Advanced Tile Card can be used via drag'n'drop and I've added support to control the columns and rows a card uses within the 4x4 grid.

![CleanShot 2024-03-12 at 15 58 11@2x](https://github.com/s1rd4v3/advanced-tile-card/assets/914248/5b77bd13-4aaf-4d3c-a813-79f541c9355b)

### 🚧 Best experience if used in a "Sections" type view since you can control the columns and rows. (No effect on other view types)

__Take a look at me matching theme for this custom card at [gugg-iis-theme](https://github.com/s1rd4v3/gugg-iis-theme)__

## Installation via HACS
HACS installation: Go to the hacs store and add a custom repo url https://github.com/s1rd4v3/advanced-tile-card to install.
After you've installed the card, you will find it in the card selection while edition a lovelace view.

## Features
- Add custom actions for icon taps and default card taps
- Custom Name
- Custom Icon
- Entities with pictures (like camera, person or media_players) can add the picture to the icon or to the background
- State string can be rendered conditionally
  - Entity attribute can be used instead of state string (like `media_title` for `media_player` domain) _Example: Only show the state text if a media_player has state "playing"_
- In a Sections view, you can control how much space a card should take within the 4x4 grid by defining columns and rows
- Theming ready with many exposed CSS variables
 
## Inspiration ❤️
- This card is heavily inspired by [matt8707](https://github.com/matt8707) [hass-config](https://github.com/matt8707/hass-config) config and the main reason I created this card
- This was done using the [Boilerplate Card](https://github.com/custom-cards/boilerplate-card) by [@iantrich](https://www.github.com/iantrich).


## Next up

- [ ] Possibility to add additional state bubble to the top right similar to [hass-config](https://github.com/matt8707/hass-config)?
- [ ] CSS optimisations
- ...
