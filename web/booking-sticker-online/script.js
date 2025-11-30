// Sidebar navigation
document.querySelectorAll('.sidebar ul li').forEach(li=>{
    li.addEventListener('click', ()=>{
        document.querySelectorAll('.sidebar ul li').forEach(x=>x.classList.remove('active'));
        li.classList.add('active');
        const section = li.dataset.section;
        document.querySelectorAll('.section').forEach(sec=>{
            sec.style.display = (sec.id===section) ? 'block' : 'none';
        });
    });
});

// ----------------- Movies -----------------
let movies = [
    {id:1, name:"Avengers", genre:"Hành động", duration:180, status:"Đang chiếu", poster:"https://via.placeholder.com/60"}
];

const movieTable = document.getElementById("movieTable");
const modalBackdrop = document.getElementById("modalBackdrop");
const btnCancel = document.getElementById("btnCancel");
const btnSave = document.getElementById("btnSave");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");

let editing = {type:null, id:null};

function renderMovies(){
    movieTable.innerHTML = "";
    movies.forEach(m=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td><img src="${m.poster}" class="poster"></td>
            <td>${m.name}</td><td>${m.genre}</td><td>${m.duration}</td><td>${m.status}</td>
            <td>
                <button class="action-btn edit" onclick="editMovie(${m.id})">Sửa</button>
                <button class="action-btn delete" onclick="deleteMovie(${m.id})">Xóa</button>
            </td>`;
        movieTable.appendChild(tr);
    });
}

function openModal(type, id=null){
    editing = {type,id};
    modalBackdrop.style.display="flex";
    modalTitle.textContent = type==="movie" ? (id?"Sửa Phim":"Thêm Phim") : "";
    if(type==="movie"){
        let m = movies.find(x=>x.id===id) || {};
        modalBody.innerHTML = `
            <label>Tên phim</label><input id="movieName" value="${m.name||''}">
            <label>Thể loại</label><input id="movieGenre" value="${m.genre||''}">
            <label>Thời lượng</label><input id="movieDuration" type="number" value="${m.duration||''}">
            <label>Trạng thái</label>
            <select id="movieStatus">
                <option ${m.status==="Đang chiếu"?"selected":""}>Đang chiếu</option>
                <option ${m.status==="Sắp chiếu"?"selected":""}>Sắp chiếu</option>
                <option ${m.status==="Ngừng chiếu"?"selected":""}>Ngừng chiếu</option>
            </select>
            <label>Poster URL</label><input id="moviePoster" value="${m.poster||''}">
        `;
    }
}

function closeModal(){ modalBackdrop.style.display="none"; editing={type:null,id:null}; modalBody.innerHTML=""; }

function editMovie(id){ openModal("movie",id); }
function deleteMovie(id){ movies = movies.filter(x=>x.id!==id); renderMovies(); }

document.getElementById("btnAddMovie").addEventListener("click", ()=>openModal("movie"));
btnCancel.addEventListener("click", closeModal);

btnSave.addEventListener("click", ()=>{
    if(editing.type==="movie"){
        const m = {
            id: editing.id||Date.now(),
            name: document.getElementById("movieName").value,
            genre: document.getElementById("movieGenre").value,
            duration: document.getElementById("movieDuration").value,
            status: document.getElementById("movieStatus").value,
            poster: document.getElementById("moviePoster").value || "https://via.placeholder.com/60"
        };
        if(editing.id){ movies = movies.map(x=>x.id===editing.id?m:x); } else { movies.push(m); }
        renderMovies();
    }
    closeModal();
});

// ----------------- Cinemas -----------------
let cinemas = [
    {id:1,name:"Galaxy Nguyễn Trãi", address:"Hà Nội", rooms:["Rạp 1","Rạp 2"]}
];
const cinemaTable = document.getElementById("cinemaTable");
function renderCinemas(){
    cinemaTable.innerHTML="";
    cinemas.forEach(c=>{
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${c.name}</td><td>${c.address}</td><td>${c.rooms.join(", ")}</td>
            <td>
                <button class="action-btn edit">Sửa</button>
                <button class="action-btn delete">Xóa</button>
            </td>`;
        cinemaTable.appendChild(tr);
    });
}
renderMovies();
renderCinemas();

// ----------------- Reports (Demo Chart) -----------------
const ctx = document.getElementById('revenueChart').getContext('2d');
const revenueChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4'],
        datasets: [{label:'Doanh Thu (triệu)', data:[50,80,65,100], backgroundColor:'#007bff'}]
    },
    options: {responsive:true}
});
