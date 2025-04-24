import { Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  // --- Standard Events ---
  Transfer as TransferEvent, // 重命名导入以避免与实体名称冲突
  Approval as ApprovalEvent, // 重命名导入以避免与实体名称冲突
  // --- Custom Events ---
  MintPerformed as MintPerformedEvent, // 重命名导入
  Burn as BurnEvent, // 重命名导入
  MultiSigWalletAdressChanged as MultiSigWalletAdressChangedEvent, // 重命名导入
  MintCapNumeratorChanged as MintCapNumeratorChangedEvent, // 重命名导入
  AllowedRecipientsUpdated as AllowedRecipientsUpdatedEvent, // 重命名导入
  ContractUpgraded as ContractUpgradedEvent, // 重命名导入
  // --- Inherited Events (Optional) ---
  Paused as PausedEvent, // 重命名导入
  Unpaused as UnpausedEvent, // 重命名导入
  OwnershipTransferred as OwnershipTransferredEvent // 重命名导入
  // --- Potentially Missing Handlers ---
  // EIP712DomainChanged, // 如果需要处理，添加导入和 handler
  // Initialized, // 如果需要处理，添加导入和 handler
  // RedemptionPoolChanged, // 如果需要处理，添加导入和 handler
  // Upgraded as PatUpgradedEvent // 如果需要处理 PAT 的 Upgraded 事件，添加导入和 handler
} from "../generated/ERC20PAT/ERC20PAT"
import { // <<< 修改：导入你在 schema.graphql 中定义的实际实体名称
  Transfer,
  Approval,
  MintPerformed,
  Burn,
  MultiSigWalletAdressChanged,
  MintCapNumeratorChanged,
  AllowedRecipientsUpdated,
  ContractUpgraded,
  Paused,
  Unpaused,
  OwnershipTransferred,
  // EIP712DomainChanged, // 如果定义了对应实体
  // Initialized, // 如果定义了对应实体
  // RedemptionPoolChanged, // 如果定义了对应实体
  // PatUpgraded // 如果定义了对应实体
} from "../generated/schema"

// --- Helper Function for ID ---
function generateEventId(event: ethereum.Event): Bytes {
  return event.transaction.hash.concatI32(event.logIndex.toI32())
}

// --- 处理标准 ERC20 事件 ---

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(generateEventId(event)) // <<< 修改：使用 Transfer 实体
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(generateEventId(event)) // <<< 修改：使用 Approval 实体
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// --- 处理 PAT 合约自定义事件 ---

export function handleMintPerformed(event: MintPerformedEvent): void {
  let entity = new MintPerformed(generateEventId(event)) // <<< 修改：使用 MintPerformed 实体
  entity.recipient = event.params.recipient
  entity.amount = event.params.amount
  entity.newTotalSupply = event.params.newTotalSupply
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleBurn(event: BurnEvent): void {
  let entity = new Burn(generateEventId(event)) // <<< 修改：使用 Burn 实体
  // 根据 ABI，参数名为 _burnAmount 和 _totalSupply
  entity.burnAmount = event.params._burnAmount
  entity.totalSupplyAfter = event.params._totalSupply
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleMultiSigWalletAdressChanged(event: MultiSigWalletAdressChangedEvent): void {
  let entity = new MultiSigWalletAdressChanged(generateEventId(event)) // <<< 修改：使用 MultiSigWalletAdressChanged 实体
  entity.from = event.params.from
  entity.oldAddr = event.params.oldAddr
  entity.newAddr = event.params.newAddr
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleMintCapNumeratorChanged(event: MintCapNumeratorChangedEvent): void {
  let entity = new MintCapNumeratorChanged(generateEventId(event)) // <<< 修改：使用 MintCapNumeratorChanged 实体
  entity.from = event.params.from
  entity.previousMintCapNumerator = event.params.previousMintCapNumerator
  entity.mintCapNumerator = event.params.mintCapNumerator
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleAllowedRecipientsUpdated(event: AllowedRecipientsUpdatedEvent): void {
  let entity = new AllowedRecipientsUpdated(generateEventId(event)) // <<< 修改：使用 AllowedRecipientsUpdated 实体
  entity.from = event.params.from
  entity.minter = event.params.minter
  entity.isAllowed = event.params.isAllowed
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleContractUpgraded(event: ContractUpgradedEvent): void {
  let entity = new ContractUpgraded(generateEventId(event)) // <<< 修改：使用 ContractUpgraded 实体
  entity.from = event.params.from
  entity.newContract = event.params.newContract
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// --- 处理继承的事件 (可选) ---

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(generateEventId(event)) // <<< 修改：使用 Paused 实体
  entity.account = event.params.account
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(generateEventId(event)) // <<< 修改：使用 Unpaused 实体
  entity.account = event.params.account
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  let entity = new OwnershipTransferred(generateEventId(event)) // <<< 修改：使用 OwnershipTransferred 实体
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// --- 添加缺失的 Handlers (如果需要) ---
/*
export function handleEIP712DomainChanged(event: EIP712DomainChangedEvent): void {
  let entity = new EIP712DomainChanged(generateEventId(event))
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(generateEventId(event))
  entity.version = event.params.version
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

export function handleRedemptionPoolChanged(event: RedemptionPoolChangedEvent): void {
  let entity = new RedemptionPoolChanged(generateEventId(event))
  entity.from = event.params.from
  entity.oldPool = event.params.oldPool
  entity.newPool = event.params.newPool
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}

// 处理 PAT 合约自身的 Upgraded 事件 (如果需要区分)
export function handlePatUpgraded(event: PatUpgradedEvent): void {
  let entity = new PatUpgraded(generateEventId(event)) // 假设实体名为 PatUpgraded
  entity.implementation = event.params.implementation
  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.save()
}
*/