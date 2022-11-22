# Naval Game

## Live Demo: https://lustrous-pixie-521b9b.netlify.app/

## Task Description:

Simplified naval combat.

0. Components must be implemented on classes, no hooks!

1. There should be a button to start a new game. Those. at any time you can reset the game and start again

2. Players (Player1 Player2) take turns making their moves (in hotseat mode).

3. There should be information about which player is currently playing

4. The size of the playing field is 5x5 cells

5. Ships are only single-deck, can be located on adjacent cells

6. The game consists of three stages 1) Arrangement of ships 2) Game 3) Announcement of the winner

1) Arrangement of ships:

-   Users take turns placing ships. That is, one playing field is displayed (first Player1, then Player2)

-   Each player must have 8 ships

\*Click on a cell = add ship cell, click again = clear the cell

-   To complete the placement, you must click on the 'Confirm' button, after which the placement of the next player's ships will begin

-   After completing the placement of Player2, the Game phase begins

2. Game:

-   Before the start of each new turn, the following is displayed: the name of the current player and the 'start move' button (the playing fields are not displayed!)

-   During the turn, the player sees his field and the field of the enemy, but does not see the location of enemy ships (only attacked cells are shown)

-   The user selects one cell on the opponent's field (click - select, re-click - cancel) and press 'Attack'

-   If the user hit / did not hit the cell with an enemy ship - the message 'Killed' / 'Missed' is displayed and the cell of the enemy field is updated

-   The user makes an attack until the first miss, after which the attack becomes unavailable

-   If an attack is no longer available (the last one ended in a miss), a 'end turn' button appears

3. Announcement of the winner:

-   The player who has no 'living' ships left loses

-   Displays the name of the winner and two playing fields

You can use a different field size or number of ships, it doesn't matter

You can use this as a template:

https://codesandbox.io/s/lesson-1-template-x90k5

Good luck!
