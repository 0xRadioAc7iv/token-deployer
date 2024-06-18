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
    "getTokenProcesses",
    Handlers.utils.hasMatchingTag("Action", "Get-Token-Processes"),
    function(msg)
        local data = json.encode(Owners[msg.From])
        ao.send({
            Target = msg.From,
            Data = data
        })
    end
)

Handlers.add(
    "getOwners",
    Handlers.utils.hasMatchingTag("Action", "Get-Owners"),
    function(msg)
        if (msg.From == ao.id) then
            local data = json.encode(Owners)
            ao.send({
                Target = msg.From,
                Data = data
            })
        else
            ao.send({
                Target = msg.From,
                Data = "Unauthorized Request"
            })
        end
    end
)
