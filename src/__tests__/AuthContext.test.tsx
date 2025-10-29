import { renderHook, act } from "@testing-library/react";
import { AuthProvider, useAuth } from "../context/AuthContext";
import Cookies from "js-cookie";

// 🔧 Mock cookie agar tidak benar-benar menulis cookie di environment test
jest.mock("js-cookie", () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
}));

describe("AuthContext", () => {
  beforeEach(() => {
    // ✅ Mock window.location agar tidak error di jsdom
    delete (window as any).location;
    (window as any).location = {
      href: "",
      assign: jest.fn(), // spy untuk redirect
    };
    jest.clearAllMocks();
  });

  it("should login as admin and redirect to /admin", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login("admin@test.com", "123");
    });

    expect(result.current.user?.role).toBe("admin");
    expect(Cookies.set).toHaveBeenCalled(); // cookie harus diset
    expect(window.location.assign).toHaveBeenCalledWith("/admin"); // ✅ redirect dicek
  });

  it("should login as user and redirect to /", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login("user@test.com", "123");
    });

    expect(result.current.user?.role).toBe("user");
    expect(Cookies.set).toHaveBeenCalled();
    expect(window.location.assign).toHaveBeenCalledWith("/"); // ✅ redirect ke home
  });

  it("should logout and remove cookie", async () => {
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

    await act(async () => {
      await result.current.login("user@test.com", "123");
      await result.current.logout();
    });

    expect(result.current.user).toBe(null);
    expect(Cookies.remove).toHaveBeenCalledWith("user");
  });
});
