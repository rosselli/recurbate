# Flows: Recurbate

+ **Url:** `https://recurbate.com/performers/`
+ **Checklist file:** `/Users/rosselli/systems/2021.04/local/checklist-notes-data/porn/cams/recurbate/checklists/checklist-all-performers.json`
+ **TemporaryData folder:** `/Users/rosselli/systems/2021.04/local/recurbate/src/data`
+ **Recent Recordings viewer:** `/Users/rosselli/systems/2021.04/local/recurbate/recent.html`
+ **Recent Recordings json:** `/Users/rosselli/systems/2021.04/local/recurbate/src/data/recent.json`
+ **Checklist and Notes:** `/Users/rosselli/systems/2021.04/local/checklist-notes/server/src` 
+ **Create Checklist command:** `node cli new-checklist porn/cams/recurbate/natashaboobs`
  

## Specific Performers
+ **Create:**

+ **Update:**

+ **Manage:**
1. I am currently editing manually on `Checklist`.
    + In the future, I will develop React app.

## All Performers
+ **Create:**
1. Create the `Checklist` manually.
1. Create the `TemporaryData` files manually.
1. Run `Console Functions` to generate the items filtered by _Male, Trans, Couples and Subscriptions_.
    + Put manually the items on `TemporaryData` files.
1. Use the `TemporaryData` files to set "rejected" or "favorite" manually.
1. Run `all-performers-set-status` to set "rejected" or "favorite" status on `Checklist`.

+ **Update:**
Repeat the steps 3, 4 and 5.
  
• **Manage:** 
1. `Recent Recordings Viewer`
    + The viewer is developed in html. In the future, I will develop React app.
1. To update the data, run `node get-recent-recordings <pages>` to update the data in the `Recent Recordings json`.
    + The data comes from `Checklist`.
    + After the filtering, the data is divided in "favorites", "blacklisted", "theRest".
    