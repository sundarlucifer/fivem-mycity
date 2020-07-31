// TODO: Change vehicle spawn to work only through smart-phone

let vehicles = ['adder', 'buzzard', 'thruster', 'fcr', 'akula', 'vigilante', 'havok', 'rogue']

// [USAGE]: /vehicles
RegisterCommand('vehicles', () => {
    let list = vehicles.join(' ')
    TriggerEvent('chat:addMessage', {args: [list]})
}, false)

// [USAGE]: /v adder
RegisterCommand('v', (source, args, raw) => {
    print(args)
    if (args == null || args == '' || args == []) return
    let ind = -1
    for (i in vehicles) {
        if (vehicles[i] == args) {
            ind = i
            break
        }
    }
    if(ind == -1) return
    spawnVehicle(vehicles[ind], GetPlayerPed(-1))
}, false)

async function spawnVehicle(vehicleName, ped) {
    print('Spawning: -', vehicleName, '-')
    RequestModel(vehicleName)
    let num = 1
    while (!HasModelLoaded(vehicleName)) {
        print(num, 'Awaiting car')
        await wait(100)
    }
    print('Got car model')
    let pos = GetEntityCoords(ped)
    let vehicle = CreateVehicle(vehicleName, pos[0] + 2, pos[1] + 2, pos[2], GetEntityHeading(ped), true, false)
    // SetPedIntoVehicle(ped, vehicle, -1)

    SetEntityAsNoLongerNeeded(vehicle)
    SetModelAsNoLongerNeeded(vehicleName)

    TriggerEvent('chat:addMessage', {
        args: [vehicleName + ' delivered']
    })
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}