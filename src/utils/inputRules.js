export const ruleNonNegative = (val) => Number(val) >= 0 ? true : 'Значение должно быть неотрицательно'
export const rulePositive = (val) => Number(val) > 0 ? true : 'Значение должно быть положительно'
export const ruleNonEmpty = (val) => String(val) != '' ? true : 'Значение должно быть заполнено'
