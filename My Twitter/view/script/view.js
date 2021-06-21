$(document).ready(function () {
	let urlSearch = $(location).attr('search');
	let myToken = urlSearch.replace('?t=', '');
	let token = localStorage.getItem('token');
	if (!token) document.location.href = '../html/inscription.html';
	console.log($('.p_edito'));
	console.log(myToken);
	console.log(token);

	$('.edito').click(function () {
		if ($('.edito').hasClass('edito_active')) {
			$('.edito').removeClass('edito_active');
			$('.p_edito')[0].innerHTML = 'Suivre';
			delete_follow();
		} else {
			$('.edito').addClass('edito_active');
			$('.p_edito')[0].innerHTML = 'Suivi';
			add_follow();
		}
	});

	function add_follow() {
		$.ajax({
			type: 'POST',
			url: '../../controller/add_follow.php',
			data: 'token_user=' + myToken + '&token=' + token,
			datatype: 'json',
			success: function (data) {
				console.log(data);
			},
		});
	}
	function delete_follow() {
		$.ajax({
			type: 'POST',
			url: '../../controller/delete_follow.php',
			data: 'token_user=' + myToken + '&token=' + token,
			datatype: 'json',
			success: function (data) {
				console.log(data);
			},
		});
	}

	$.ajax({
		url: '../../controller/resultSearch.php',
		type: 'POST',
		dataType: 'html',
		data: 'token=' + myToken,
		success: function (data) {
			let objet;
			if (data !== 'false') {
				objet = jQuery.parseJSON(data);
				$('.username').append(objet[0].username);
				$('.arobase').append(objet[0].arobase);

				for (const o in objet) {
					$('#item1').append(
						'<div class="container"><div class="container_header"><div class="photo"><img src="http://localhost/tweet_academie/view/upload/photo/profil.png" alt="tweet_image"></div><div class="usr_name"><div class="username">' +
							objet[o].username +
							'</div><div class="arobase">' +
							objet[o].arobase +
							'</div></div></div><div class="container_body"><div class="contenu_tweet">' +
							objet[o].contenu +
							'</div><div class="date_tweet">' +
							objet[o].date_tweet +
							'</div></div></div></div>'
					);
				}
				$("div.contenu_tweet:contains('#')").each(function (el) {
					let rest = $(this)
						.html()
						.match(/#+[a-z]*/g);
					let txt = $(this).text().substring(1);
					$(this).html(
						$(this)
							.html()
							.replace(
								/\B(\#[a-zA-Z]+\b)(?!;)/g,
								'<a href=result.php?k=%23' + txt + ' style=color:#03a9f4;text-decoration:none>' + rest + '</a>'
							)
					);
				});
			}
		},
	});
});
