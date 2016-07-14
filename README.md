# angular-keystroke-dynamics

This Angularjs directive improves the password input form, collecting the keystroke dynamics together with the password.
A script running in the back-end can use the information to do a better user identification, i.e. checking that the person that is typing the (right) password is indeed who has the authorization.

Note: the analysis of keystroke dynamics without user permission may violate local laws, use this module only for personal research.

## Usage

Include the module in your controller. Then use:

```javascript
<input type="password" keystroke-dynamics ng-model="your_password_variable" />
```

The keystroke dynamics is saved in the scope with this name:
```javascript
$scope.keystrokeDynamics;
```

## Output

The time intervals (measured in milliseconds) between two different digits are stored in json format.
This sequence is contained in seq_0.
If the user strokes 'backspace' a new sequence seq_1 is created and populated starting from that instant (this happens for each 'backspace').
