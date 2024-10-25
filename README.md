# Install

```
npm i
```

# Build
```
npm run build
```

# Test
```
npm run test
```

# Assumptions

- Assuming from the wording of the requirements, that only one live match can be active at any given point.
- The update score therefore will update the only ongoing/live match, without the need for an additional parameter to specify the match in question
- Added a display function to the method for ease of testing, where the no ongoing match string can be modified to fit any upcoming requirement if needed.
- If a match is not finished, it will not be displayed in the summary table, regardless if there was an update in score or not.
