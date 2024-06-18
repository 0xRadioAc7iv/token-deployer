local ao = require("ao")
local json = require("json")

Owners = {}

Handlers.add(
    "newToken",
    Handlers.utils.hasMatchingTag("Action", "Update"),
    function(msg)
        if not Owners[msg.From] then
            Owners[msg.From] = {}
        end
        table.insert(Owners[msg.From], msg.Process)
    end
)

Handlers.add(
    "getOwners",
    Handlers.utils.hasMatchingTag("Action", "Get-Owners"),
    function(msg)
        ao.send({
            Target = msg.From,
            Data = json.encode(Owners)
        })
    end
)
