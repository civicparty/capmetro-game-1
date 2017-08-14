// import _ from 'underscore'
import modeChoices from '../config/modeChoices'


function calculations(state = [], action = {}) {
  switch (action.type) {
    case 'UPDATE_BUDGET_AMOUNT':
      const amount = action.choices.market && action.choices.market.budget

      return Object.assign({}, state, { budgetAmount: amount })
    case 'UPDATE_COSTS_AMOUNT':
      const { market, mode, guideway, serviceTimes } = action.choices

      const routeDistance = (market && market.distance) || 1
      const capacityPerVehicle = (mode && mode.capacityPerVehicle) || 1
      const capitalCostPerMile = (guideway && guideway.capitalCostPerMile) || 1
      const costPerRevHour = (guideway && guideway.costPerRevHour) || 1
      const maintenanceCost = (guideway && guideway.maintenanceCosts) || 0

      // TODO, get theses numbers dynamically
      const _vehicleCount = 5     // Need a default value for each mode type
      // const _costPerHour = 10
      // const _revenueMiles = 100

      // Vehicle count needs to be calculated backwards from frequency
      const vehicleCost = mode ? _vehicleCount * mode.capitalCostPerVehicle : 0

      // Guideway = miles (route type choice) * Capital Cost / mile
      const guidewayCost = market && guideway ? routeDistance * capitalCostPerMile : 0

      const serviceTimeWeeklySum = () => {
        if (serviceTimes) {
          return serviceTimes.reduce((sum, item) => {
            if (item.checked) {
              return sum + item.hours
            } else {
              return sum
            }
          }, 0)
        } else {
          return 1
        }
      }

      const revenueHours = serviceTimeWeeklySum() * 52
      const operatingCost = serviceTimes ?
        revenueHours * costPerRevHour : 0

      // We need to calculate revenue hours for each selected Service Time Range.
      // That means we need to calculate number of vheciles needed each service time range.

      // From there, we sum those revenu hours. to a annual value and multiply by costPerRevHour

      // MAX NUMBER peak hour VEHCLES NEEDED (Capital Cost)
      // overall distance of market * 2 / speed = round trip time end to end
      // round trip time / frequency at peak hour = number of vehicles needed

      // Total budget - annual capital (O&M) costs  = remaining budget
      // remaining budget / annual o&m = years of operation funded

      // trips per hour = (60 / frequency) * 2 (for roundtrip)
      // trip count = hours in service time range * trips per hour /// need to calculate trip count for each service time range
      // capacity per day = tripCount * capacityPerVehicle

      // const capacity = tripCount * capacityPerVehicle

      const newCalculations = {
        vehicleCost,
        guidewayCost,
        maintenanceCost,
        operatingCost,
        totalCosts: vehicleCost + guidewayCost + maintenanceCost + operatingCost,
      }

      return Object.assign({}, state, newCalculations)
    default:
      return state;
  }
}

export default calculations;