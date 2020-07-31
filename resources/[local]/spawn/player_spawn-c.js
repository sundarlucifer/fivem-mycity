var stagePos = [686.245, 577.950, 130.461]  // stadium
var hospitalPos = [357.5, -597.5, 28.6]     // Hospital

AddEventHandler('onClientGameTypeStart', () => {
    exports.spawnmanager.spawnPlayer({
        x: stagePos[0],
        y: stagePos[1],
        z: stagePos[2],
        model: 'a_m_m_skater_01'
    })
    TriggerEvent('chat:addMessage', {args: ['^2[EMBESSY]^7: Wishing you a happy welcome to the city']})

    exports.spawnmanager.setAutoSpawn(false)    // player doent auto-spawn after death
})

RegisterCommand('suicide', () => {
    let ped = GetPlayerPed(-1)
    SetEntityHealth(ped, 0)

    TriggerEvent('chat:addMessage', {args: ['^1You commited suicide']})
    TriggerEvent('chat:addMessage', {args: ['^6Help^7:/hospital to revive']})
}, false)

RegisterCommand('hospital', () => {
    let ped = GetPlayerPed(-1)
    SetEntityHealth(ped, 200)
    exports.spawnmanager.spawnPlayer({
        x: hospitalPos[0],
        y: hospitalPos[1],
        z: hospitalPos[2],
        model: 'a_m_m_skater_01'
    })

    TriggerEvent('chat:addMessage', {
        args: ['^2[HOSPITAL]^7: You are treated']
    })
}, false)

print(GetEntityCoords(GetPlayerPed(-1)))