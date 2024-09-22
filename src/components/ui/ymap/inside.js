
function intersectHRay (p, a, b) {
  /*
    p - test point
    [a, b] - line segment to intersect with horizontal ray
  */
  // Coordinates transform: target point is in the origin now
  const x1 = a[0] - p[0]
  const y1 = a[1] - p[1]
  const x2 = b[0] - p[0]
  const y2 = b[1] - p[1]

  // If both (a, b) are to the left, the ray doesn't intersect the segment
  if (x1 < 0 && x2 < 0) return 0;

  // If both point are upper or lower than ray, there's no intersection
  if (y1 * y2 > 0 && y2 < 0) return 0;
  if (y1 * y2 > 0 && y2 > 0) return 0;

  const k = (x1 - x2) / (y1 - y2)
  return x1 - k * y1 >=0 ? 1 : 0
}


function insideRect (p, geom) {
  const g = [...geom, geom[0]]
  let nm = 0;
  for (let n = 0; n < 4; n++) {
    nm += intersectHRay(p, g[n], g[n + 1])
  }
  return nm % 2 == 1 
}


function insideCircle (p, geom) {
  return (p[0] - geom[0][0]) ** 2 + (Math.cos(geom[0][0] * Math.PI / 180) * (p[1] - geom[0][1])) ** 2 <= (geom[1] / 111000) ** 2
}


export function inside (p, figure) {
  return figure.type == 'circle' ? insideCircle (p, figure.geometry) : insideRect (p, figure.geometry)
}