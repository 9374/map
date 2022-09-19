import request from "./request";
/**
 * 
 * @param {*} key 	
请求服务权限标识
 * @param {*} ip 	
ip地址 需要搜索的IP地址（仅支持国内）

若用户不填写IP，则取客户http之中的请求来进行定位
 * @param {*} sig 	
签名 选择数字签名认证的付费用户必填
 * @returns 
 */
export const GeolocationApi = (key, ip, sig) => {
  return request({
    url: 'https://restapi.amap.com/v3/ip',
    method: 'GET',
    params: { key ,ip,sig},
  })
}