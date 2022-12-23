export const transformTokenTypeByGroupType = (groupType) => {
  let newTokenType = groupType;
  if (['spacing', 'mediaQuery', 'fontSize', 'letterSpacing', 'lineHeight'].includes(groupType)) {
    newTokenType = 'dimension';
  } else if (groupType === 'radius') {
    newTokenType = 'string';
  }
  return newTokenType;
}