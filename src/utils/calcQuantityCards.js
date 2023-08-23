import {
  LARGE_WIDTH,
  MIDDLE_WIDTH,
  SMALL_WIDTH,
  xxlWidth,
  xlWidth,
  lWidth,
  sWidth,
} from './constants';

export default function calcQuantityCards () {
  const widthWindow = window.innerWidth;
  if (widthWindow >= LARGE_WIDTH) {
    return xxlWidth
  } else if (widthWindow >= MIDDLE_WIDTH) {
    return xlWidth
  } else if (widthWindow >= SMALL_WIDTH) {
    return lWidth
  } else {
    return sWidth
  }
}
