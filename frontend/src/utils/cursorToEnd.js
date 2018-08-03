/**
 * Callback for the onFocus prop of an <input /> element. Ensures the cursor is
 * at the end of the text when the input is focused.
 */
export const cursorToEnd = event => {
  const length = event.target.value.length;
  event.target.setSelectionRange(length, length);
};
