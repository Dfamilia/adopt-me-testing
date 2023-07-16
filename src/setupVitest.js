import createFetchMock from "vitest-fetch-mock";
import { vi } from "vitest";
/* vi is vitest utility */
/* This script is going to universally 'enable mocks' throughout the entire 'test suite' */
const fetchMock = createFetchMock(vi);
fetchMock.enableMocks();
