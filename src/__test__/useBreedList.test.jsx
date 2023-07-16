import { expect, test } from "vitest";
import { render, renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import useBreedList from "../useBreedList";

// we'll create a fake call to the hook with default params
const queryClient = new QueryClient({
  defaultOptions: {
    staleTime: Infinity,
    cacheTime: Infinity,
    retry: false, // by default the query are true and has 3 iterations
  },
});

// the old way to do this test is recreate all the step to do a fake call to the hook
// make it from a makeshift react component building just for the test.
/* Beging Old Test Form */
// function getBreedList(animal) {
//   let list;

//   // makeshift react component
//   function TestComponent() {
//     list = useBreedList(animal);
//     return null;
//   }

//   render(
//     <QueryClientProvider client={queryClient}>
//       <TestComponent />
//     </QueryClientProvider>
//   );

//   return list;
// }
/* End Old Test Form */

test("gives an empty list with no animal provided", async () => {
  // get test data from the hook inside of makeshift react component
  // it's part of the old way to call
  /* Beging Old Test Form */
  // const [breedList, status] = getBreedList();
  // expect(breedList).toHaveLength(0);
  // expect(status).toBe("loading");
  /* End Old Test Form */

  /* Begin New Test Form */
  const { result } = renderHook(() => useBreedList(""), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  const [breedList, status] = result.current;
  expect(breedList).toHaveLength(0);
  expect(status).toBe("loading");
  /* End New Test Form */
});

/* Using Mocks to avoid fetch the data from our API when you ara testing*/

test("gives back breeds when given an animal", async () => {
  const breeds = [
    "Havanese",
    "Bichon Frise",
    "Poodle",
    "Maltese",
    "Golden Retriever",
    "Labrador",
    "Husky",
  ];

  fetch.mockResponseOnce(
    JSON.stringify({
      animal: "dog",
      breeds,
    })
  );

  const { result } = renderHook(() => useBreedList("dog"), {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
  });

  /* here we ask for the status of the query */
  await waitFor(() => expect(result.current[1]).toBe("success"));

  const [breedList] = result.current;
  expect(breedList).toEqual(breeds);
});
