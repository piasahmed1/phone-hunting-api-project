const loadPhone = async (searchText  = '13', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json();

  const phones = data.data;
  // console.log(phones)
  displayPhones(phones, isShowAll);

}

const displayPhones = (phones, isShowAll) => {
  // console.log(phones)
  const phoneContainer = document.getElementById('phone-container')
  // clear phone container card before adding new cards
  phoneContainer.textContent = '';


  // display show all buttons if there are more than 12 phones
  const showAllContainer = document.getElementById('show-all-container')
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove('hidden')
  }
  else {
    showAllContainer.classList.add('hidden')
  }
// console.log('is sho all', isShowAll)

  // display first 12 phones if not show all
  if(!isShowAll){
    phones = phones.slice(0, 12)
  }
 

  phones.forEach(phone => {
    // console.log(phone)

    // 2. create a div
    const phoneCard = document.createElement('div');

    phoneCard.classList = `card bg-gray-100 p-4`

    // set inner HTML
    phoneCard.innerHTML = `<figure><img src="${phone.image} " alt="Shoes" /></figure>
<div class="card-body">
<h2 class="card-title">${phone.phone_name} </h2>
<p>If a dog chews shoes whose shoes does he choose?</p>
<div class="card-actions justify-center">
<button onclick="handleShowAllDetail('${phone.slug}'); show_detail_modal.showModal()" class="btn btn-primary">show Details</button>
</div>
</div>`

    // append Child
    phoneContainer.appendChild(phoneCard)
    

  })
  // hide loading spinner 
  toggleLoddingSpinner(false);

}

const handleShowAllDetail = async (id) =>{
  // console.log('click show detail', id)
  // load single phone data
const res = await fetch('https://openapi.programming-hero.com/api/phone/${id}');
const data = await res.json();
const phone = data.data;
console.log(phone)

showPhoneDetails(phone)

}

const showPhoneDetails = (phone) =>{
  console.log(phone)
const phoneName = document.getElementById('show-detail');
phoneName.innerText = phone.name;

const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer = innerHTML = `
<img src= "${phone.image}" alt="" />

`


  // show the modal 
  show_detail_modal.showModal();
}

// handle search Button
const handleSearch = (isShowAll) => {
  toggleLoddingSpinner(true)
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText)
  loadPhone(searchText, isShowAll)
}

// handle search recap
// const handleSearch2 = () =>{
//   toggleLoddingSpinner(true);
//   const searField = document.getElementById('search-field-2');
//   const searchText = searField.value;
//   loadPhone(searchText)

// }

const toggleLoddingSpinner = (isLoading) => {
  const lodingSpinner = document.getElementById('lodding-spinner');
  if (isLoading) {
    lodingSpinner.classList.remove('hidden')

  }
  else {
    lodingSpinner.classList.add('hidden')
  }
}

// handle show all 
const handleShowAll = () => {
  handleSearch(true);
}


loadPhone()