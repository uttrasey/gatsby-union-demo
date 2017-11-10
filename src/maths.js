const getCircleArea = radius => {
  const area = radius * radius * Math.PI
  return Math.round(area * 100) / 100
}

export {
  getCircleArea
}
