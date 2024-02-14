use aiken/transaction.{Mint, ScriptContext, placeholder}

type MintRedeemer {
  message: ByteArray,
}

validator {
  fn mint_with_contract(redeemer: MintRedeemer, context: ScriptContext) {
    let ScriptContext { purpose, .. } = context
    expect Mint(_) = purpose
    redeemer.message == "mesh"
  }
}

test success_with_correct_redeemer() {
  let mock_policy = #"1c1b7afe8affbee1505cf3ec5a58bd2734d4ffdfcc9b9f059625bd76"
  let redeemer = MintRedeemer { message: "mesh" }
  let context =
    ScriptContext { purpose: Mint(mock_policy), transaction: placeholder() }
  mint_with_contract(redeemer, context)
}

test failure_with_incorrect_redeemer() {
  let mock_policy = #"1c1b7afe8affbee1505cf3ec5a58bd2734d4ffdfcc9b9f059625bd76"
  let redeemer = MintRedeemer { message: "not mesh" }
  let context =
    ScriptContext { purpose: Mint(mock_policy), transaction: placeholder() }
  !mint_with_contract(redeemer, context)
}
