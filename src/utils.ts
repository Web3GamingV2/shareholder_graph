import { Bytes, ethereum } from "@graphprotocol/graph-ts"

/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-04 11:44:37
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-04 11:44:49
 * @FilePath: /shareholder_graph/src/utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// --- Helper Function for ID ---
export function generateEventId(event: ethereum.Event): Bytes {
    return event.transaction.hash.concatI32(event.logIndex.toI32())
  }