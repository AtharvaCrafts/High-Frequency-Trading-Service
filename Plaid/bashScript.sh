export PLAID_CLIENT_ID="f9c783ac-3cde-4a07-9e9b-75af62468e4f"
export PLAID_SECRET="4541dfaa-2870-4f5d-8270-ffcb85628cf4"

curl -X GET https://production.plaid.com/fdx/recipients \
  -H "Content-Type: application/json" \
  -H "PLAID-CLIENT-ID: $PLAID_CLIENT_ID" \
  -H "PLAID-SECRET: $PLAID_SECRET"
