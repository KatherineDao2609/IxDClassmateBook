const container = document.getElementById('cards-container');
const loadingSpinner = document.querySelector('.loading-spinner');
const notification = document.getElementById('notification');
const userApiUrl = 'https://randomuser.me/api/';
const unsplashApiUrl = 'https://api.unsplash.com/photos/random?count=9&query=people';  
const unsplashApiKey = 'PzwnVW3-QApDeTTrfbXMCC_B3nlG9Cmjm-YIOcbflio';
const gradients = [
  'radial-gradient(circle at center, #CBF531 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #F55822 20%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #FBB6EC 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #1A4CFF 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #D4B1F5 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #CBF531 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #F55822 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #FBB6EC 10%, rgba(115, 115, 115, 0.3) 80%)',
  'radial-gradient(circle at center, #1A4CFF 10%, rgba(115, 115, 115, 0.3) 80%)'
  
  
];

// Function to show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');
  notification.style.display = 'block';

  setTimeout(() => {
    notification.classList.remove('show');
    notification.style.display = 'none';
  }, 2000);
}

// Starting the code retrieved from chatGPT https://chatgpt.com/share/66f306dc-49e0-8012-93ad-ab247c24b57e
async function fetchRandomUsers() {
  // Clear the previous cards
  container.innerHTML = '';

  try {
    loadingSpinner.classList.remove('hidden'); // Show spinner

    const userResponses = await Promise.all(
      Array.from({ length: 9 }).map(() =>
        fetch(userApiUrl).then(res => res.json())
      )
    );

    const unsplashResponse = await fetch(unsplashApiUrl, {
      headers: {
        Authorization: `Client-ID ${unsplashApiKey}`
      }
    });
    const unsplashData = await unsplashResponse.json();

    userResponses.forEach((response, index) => {
      const user = response.results[0];
      const imageUrl = unsplashData[index].urls.regular;
    
      const card = document.createElement('div');
      card.className = 'card';
      card.style.background = gradients[index % gradients.length]; // Assign radial gradient
      card.innerHTML = `
        <h2>${user.name.first} ${user.name.last}</h2>
        <img src="${imageUrl}" alt="User Photo" class="card-img">
        <div class="card-info1">
          <p>${user.email}</p>
        </div>
        <div class="card-info2">
        <p><span class="material-symbols-outlined">cake</span> ${new Date(user.dob.date).toLocaleString('en-US', { day: 'numeric', month: 'long' })}</p>
        </div>
        <div class ="svg-container">
        <div class="lefticon">
          <img src="ixdlogo.svg" alt="Left Icon" class="icon-img">
        </div>
        <div class="righticon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        </div>
      </div>
      `;
    
      // Click event to copy email
      card.addEventListener('click', () => {
        navigator.clipboard.writeText(user.email).then(() => {
          showNotification(`Copied: ${user.email}`);
        }).catch(err => {
          console.error('Error copying email:', err);
        });
      });
    
      container.appendChild(card);
    });
    

    loadingSpinner.classList.add('hidden'); // Hide spinner

  } catch (error) {
    console.error('Error fetching random users or Unsplash images:', error);
    loadingSpinner.classList.add('hidden'); // Hide spinner if there's an error
  }
}

// Ending the code retrieved from chatGPT https://chatgpt.com/share/66f306dc-49e0-8012-93ad-ab247c24b57e

// Button click event
function handleYearButtonClick(event) {
  const buttons = document.querySelectorAll('.year-button');
  buttons.forEach(button => {
    button.classList.remove('active');
  });
  event.currentTarget.classList.add('active');
  fetchRandomUsers(); // Fetch users when button is clicked
}

// Add event listeners to buttons
const yearButtons = document.querySelectorAll('.year-button');
yearButtons.forEach(button => {
  button.addEventListener('click', handleYearButtonClick);
});

// Initial fetch
fetchRandomUsers();
