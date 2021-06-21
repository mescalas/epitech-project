$(document).ready(() => {
	let folder_required;
	let path = '/Applications/MAMP/htdocs/my_H5AI/folder_test';
	let name_folder = path.substr(path.lastIndexOf('/'));
	name_folder = name_folder.substr(1);
	let last_path;

	$.ajax({
		url: '../../controller/getFolders.php',
		type: 'GET',
		data: 'path=' + path,
		success: (data) => {
			$('#tree').append(data);
		},
	});

	AjaxRequest(path);
	$('#related_path').empty();
	$('#button').empty();
	$('#related_path').append('<h5>' + path + '</h5>');
	$('#button').append(
		"<button type='button' id='retour' class='btn btn-outline-dark' disabled>←</button><button type='button' id='avancer' class='btn btn-outline-dark' disabled>→</button>"
	);

	document.body.addEventListener('click', (e) => {
		if (e.target.className === 'li') {
			folder_required = e.target.attributes['path'].value;
			$('#related_path').empty();
			$('#button').empty();
			$('#related_path').append('<h5>' + folder_required + '</h5>');
			$('#button').append(
				"<button type='button' id='retour' class='btn btn-outline-dark'>←</button><button type='button' id='avancer' class='btn btn-outline-dark' disabled>→</button>"
			);
			AjaxRequest(folder_required);
		}
		if (e.target.innerHTML.substr(-4) == '.txt') {
			$('.modal-title').empty();
			$('.modal-body').empty();
			$('.modal-title').append('Preview du fichier : ' + e.target.innerText);
			$('#exampleModal').modal('toggle');
			let arr_path = data_[data_.length - 3];
			let path = arr_path.filter((path) => path.includes(e.target.innerText));
			$.ajax({
				url: '../../controller/getContent.php',
				type: 'GET',
				data: 'path=' + path[0],
				success: (data) => {
					$('.modal-body').append(data);
					$('#exampleModal').modal('toggle');
				},
			});
		}

		if (e.target.id == 'retour') {
			$('#avancer').prop('disabled', false);
			if (folder_required.substr(folder_required.lastIndexOf('/')).includes(name_folder)) {
				$('#retour').prop('disabled', true);
			} else {
				let new_path = folder_required.substr(0, folder_required.lastIndexOf('/'));
				last_path = folder_required;
				folder_required = new_path;
				$('#related_path').empty();
				$('#related_path').append('<h5>' + new_path + '</h5>');
				AjaxRequest(new_path);
			}
		}

		if (e.target.id == 'avancer') {
			$('#avancer').prop('disabled', true);
			$('#retour').prop('disabled', false);
			$('#related_path').empty();
			$('#related_path').append('<h5>' + last_path + '</h5>');
			folder_required = last_path;
			AjaxRequest(last_path);
		}
	});

	function AjaxRequest(chemin) {
		$.ajax({
			url: '../../controller/getFiles.php',
			type: 'GET',
			data: 'path=' + chemin,
			success: (data) => {
				// data_ = JSON.parse(data);
				console.log(data);
				$('#container').empty();
				$('.taille').empty();
				$('.modif').empty();
				$('#container').append('<p><b>Contenu du dossier</b></p>');
				$('.taille').append('<p><b>Taille du fichier</b></p>');
				$('.modif').append('<p><b>Date de modification</b></p>');
				if (data_[0].length == 0) $('#container').append('<h1 id="vide">Vide</h1>');
				for (let i = 0; i < data_.length - 3; i++) {
					$('.taille').append("<p class='file_size'>" + data_[data_.length - 2][i] + ' octets</p>');
					$('.modif').append("<p class='file_modification'>" + data_[data_.length - 1][i] + '</p>');
					switch (true) {
						case data_[i].substr(-4) == '.txt':
							$('#container').append("<div class='wrapper1'><div class='txt_icon'></div>" + data_[i] + '</div>');
							break;
						case data_[i].substr(-4) == '.pdf':
							$('#container').append("<div class='wrapper1'><div class='pdf_icon'></div>" + data_[i] + '</div>');
							break;
						case data_[i].indexOf('.') == -1:
							$('#container').append("<div class='wrapper1'><div class='folder_icon'></div>" + data_[i] + '</div>');
							break;
						case data_[i].substr(-4) == '.jpg' || data_[i].substr(-5) == '.jpeg' || data_[i].substr(-4) == '.png':
							$('#container').append("<div class='wrapper1'><div class='img_icon'></div>" + data_[i] + '</div>');
							break;
						default:
							$('#container').append("<p class='file'>" + data_[i] + '</p>');
					}
				}
			},
		});
	}
});
