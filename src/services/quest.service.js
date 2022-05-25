import api from "../modules/api";

export async function postQuest({ request, questId, type }) {
    const url = `/api/quests/${questId}?type=${type}`;
    const { data } = await api.post(url, { ...request });
    return data;
}

export async function getQuestList(lat, lng) {
    const url = `/api/quests?lat=${lat.toFixed(6)}&lng=${lng.toFixed(6)}`
    const { data } = await api.get(url)
    return data
  }
