export function getCurrentAuthority() {
  return ['admin']
}

export function check(authority) {
  const current = getCurrentAuthority()
  return current.some(v => authority.includes(v))
}

// 是否登录状态
export function isLogin() {
  const current = getCurrentAuthority() 
  return current && current[0] !== 'guest'
}