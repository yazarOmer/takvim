import axios from 'axios'

const API_URL = '/api/goals/'

const createGoal = async (goalData) => {

    const response = await axios.post(API_URL, goalData)

    return response.data
}

const getGoals = async () => {

    const response = await axios.get(API_URL)

    return response.data
}

const goalService = {
    createGoal,
    getGoals
}

export default goalService