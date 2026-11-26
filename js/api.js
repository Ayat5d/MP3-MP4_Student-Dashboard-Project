// api.js - fetches data from the external API using fetch() and async/await

const API_URL = "https://dummyjson.com/users?limit=100";

// Returns an array of student objects. Throws an Error if the request fails.
async function fetchStudentsFromApi() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  let response;
  try {
    response = await fetch(API_URL, { signal: controller.signal });
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("The API request timed out.");
    }
    throw new Error("Could not connect to the API.");
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    throw new Error(`Server responded with status ${response.status}`);
  }

  const data = await response.json();

  // Shape each API user into a student object
  return data.users.map((u) => ({
    id: u.id,
    name: `${u.firstName} ${u.lastName}`,
    age: u.age,
    gender: u.gender,
    email: u.email,
    phone: u.phone,
    image: u.image,
    university: u.university,
    department: u.company.department,
    city: u.address.city,
    country: u.address.country,
  }));
}
