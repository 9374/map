export const handler = () => {
  // 需要确保已经在 setup 中执行了 window.$message = message
  window.$message.success(
    'Cause you walked hand in hand With another man in my place'
  )
}