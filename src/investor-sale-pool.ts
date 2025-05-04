import {
    PurchaseConfirm as PurchaseConfirmEvent,
    TreasuryRatioUpdated as TreasuryRatioUpdateEvent, // Renamed import
    SaleStateUpdated as SaleStateUpdateEvent, // Renamed import
    TokensReleased as TokensReleasedEvent, // Renamed import
    RedemptionRequested as RedemptionRequestEvent, // Renamed import
    RedemptionCompleted as RedemptionCompleteEvent, // Renamed import
    RedemptionCancelled as RedemptionCancelEvent, // Renamed import
    SubscriptionRequestedByUsdt as SubscriptionRequestEvent // Renamed import
  } from "../generated/InvestorSalePool/InvestorSalePool"
  import {
    PurchaseConfirmEvent as PurchaseConfirmEntity, // Use alias for entity
    TreasuryRatioUpdateEvent as TreasuryRatioUpdateEntity, // Use alias for entity
    SaleStateUpdateEvent as SaleStateUpdateEntity, // Use alias for entity
    TokensReleasedEvent as TokensReleasedEntity, // Use alias for entity
    RedemptionRequestEvent as RedemptionRequestEntity, // Use alias for entity
    RedemptionCompleteEvent as RedemptionCompleteEntity, // Use alias for entity
    RedemptionCancelEvent as RedemptionCancelEntity, // Use alias for entity
    SubscriptionRequestEvent as SubscriptionRequestEntity // Use alias for entity
  } from "../generated/schema"
  import { generateEventId } from "./utils"; // Assuming you have a utility function like this
  
  export function handlePurchaseConfirm(event: PurchaseConfirmEvent): void {
    let entity = new PurchaseConfirmEntity(generateEventId(event))
    entity.user = event.params.user
    entity.usdtAmount = event.params.usdtAmount
    entity.patAmount = event.params.patAmount
    entity.vestingWallet = event.params.vestingWallet
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleTreasuryRatioUpdated(event: TreasuryRatioUpdateEvent): void {
    let entity = new TreasuryRatioUpdateEntity(generateEventId(event))
    // ABI names might be _oldRatio, _newRatio based on common patterns, check ABI if needed
    entity.oldRatio = event.params.oldRatio // Assuming param name is oldRatio
    entity.newRatio = event.params.newRatio // Assuming param name is newRatio
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleSaleStateUpdated(event: SaleStateUpdateEvent): void {
    let entity = new SaleStateUpdateEntity(generateEventId(event))
    // ABI name might be _isActive, check ABI if needed
    entity.isActive = event.params.isActive // Assuming param name is isActive
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleTokensReleased(event: TokensReleasedEvent): void {
    let entity = new TokensReleasedEntity(generateEventId(event))
    entity.user = event.params.user
    entity.vestingWallet = event.params.vestingWallet // Assuming param name is vestingWallet
    entity.releasedAmount = event.params.releasedAmount // Assuming param name is releasedAmount
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleRedemptionRequested(event: RedemptionRequestEvent): void {
    let entity = new RedemptionRequestEntity(generateEventId(event))
    entity.requestId = event.params.requestId
    entity.user = event.params.user
    entity.patAmount = event.params.patAmount
    entity.usdtAmount = event.params.usdtAmount
    entity.purchaseIndex = event.params.purchaseIndex
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleRedemptionCompleted(event: RedemptionCompleteEvent): void {
    let entity = new RedemptionCompleteEntity(generateEventId(event))
    entity.requestId = event.params.requestId
    entity.user = event.params.user
    entity.patAmount = event.params.patAmount
    entity.usdtAmount = event.params.usdtAmount
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleRedemptionCancelled(event: RedemptionCancelEvent): void {
    let entity = new RedemptionCancelEntity(generateEventId(event))
    entity.requestId = event.params.requestId
    entity.user = event.params.user
    entity.patAmount = event.params.patAmount
    entity.usdtAmount = event.params.usdtAmount
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }
  
  export function handleSubscriptionRequestedByUsdt(event: SubscriptionRequestEvent): void {
    let entity = new SubscriptionRequestEntity(generateEventId(event))
    entity.user = event.params.user
    entity.subscriptionId = event.params.subscriptionId
    entity.patAmount = event.params.patAmount
    entity.usdtAmount = event.params.usdtAmount
    entity.expiryTimestamp = event.params.expiryTimestamp
    entity.blockNumber = event.block.number
    entity.blockTimestamp = event.block.timestamp
    entity.transactionHash = event.transaction.hash
    entity.save()
  }