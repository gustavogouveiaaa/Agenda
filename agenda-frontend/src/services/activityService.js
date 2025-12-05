// src/services/activityService.js

import api from "../api/api";

export function getActivities() {
  return api.get("/activities");
}

export function createActivity(data) {
  return api.post("/activities", data);
}

export function updateActivity(id, data) {
  return api.put(`/activities/${id}`, data);
}

export function deleteActivity(id) {
  return api.delete(`/activities/${id}`);
}

export function updateStatus(id, status) {
  return api.patch(`/activities/${id}`, { status });
}
