import {
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  SIDEBAR_TOGGLE,
  LOADING,
} from "./actionTypes";

import { toast } from "react-toastify";

export const authSuccess = (updates) => {
  if (updates.accessToken) {
    localStorage.setItem("accessToken", updates.accessToken);
  }
  if (updates.refreshToken) {
    localStorage.setItem("refreshToken", updates.refreshToken);
  }
  return {
    type: AUTH_SUCCESS,
    updates,
  };
};

export const sidebarToggle = (updates) => {
  return {
    type: SIDEBAR_TOGGLE,
    updates,
  };
};

export const logout = () => {
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessToken");
  toast.success("You are now logged out!");
  return {
    type: AUTH_LOGOUT,
  };
};

export const updateLoading = (updates) => {
  return {
    type: LOADING,
    updates,
  };
};
