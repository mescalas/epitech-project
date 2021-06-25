$(document).ready(function () {
    $("#start").click(function () {
        let rows = $("#nbrLigne").val();
        let cols = $("#nbrColone").val();
        let pseudoJ1 = $("#pseudo1").val();
        let pseudoJ2 = $("#pseudo2").val();
        let couleurJetonsJ1 = $("#couleurJetonsJ1").val();
        let couleurJetonsJ2 = $("#couleurJetonsJ2").val();
        let couleur_actuel = "";
        let joueur_actuel = "";
        let position = "";
        let flag = 1;

        if (couleurJetonsJ1 == couleurJetonsJ2) {
            alert("Chaque joueur doit posséder une couleur différente !");
            flag = 0;
        }
        if ((pseudoJ1 === "", pseudoJ2 == "")) {
            alert("Veuillez rentrer des pseudos pour les joueurs !");
            flag = 0;
        }

        if (flag != 0) {
            const Joueur1 = {
                pseudo: pseudoJ1,
                couleur: couleurJetonsJ1,
                compteur_winJ1: 0,
            };
            const Joueur2 = {
                pseudo: pseudoJ2,
                couleur: couleurJetonsJ2,
                compteur_winJ2: 0,
            };
            $("body").puissance4(rows, cols, Joueur1, Joueur2, couleur_actuel, joueur_actuel, position);
        }
    });

    (function ($) {
        $.fn.puissance4 = function (rows, cols, Joueur1, Joueur2, couleur_actuel, joueur_actuel, position) {
            let game = new Game(rows, cols, Joueur1, Joueur2, couleur_actuel, joueur_actuel, position);
        };
    })(jQuery);

    class Game {
        constructor(rows, cols, Joueur1, Joueur2, couleur_actuel, joueur_actuel, position) {
            this.rows = rows;
            this.cols = cols;
            this.Joueur1 = Joueur1;
            this.Joueur2 = Joueur2;
            this.compteur = 0;
            this.couleur_actuel = couleur_actuel;
            this.joueur_actuel = joueur_actuel;
            this.position = position;
            this.compteur_ = 0;
            this.puissance4 = [];
            this.make_grid();
        }

        make_grid() {
            $("body").empty();
            $("body").prepend('<div class="title">Puissance 4 !</div>');
            $("body").append("<div class='circle1'></div>");
            $("body").append("<div class='circle2'></div>");
            $("body").append("<table>");
            $("body").append("<div class='retour'><input id='retour' type='button' value='Retour'></div>");
            $("body").append(
                "<div class='compteur_win'><p>" +
                    this.Joueur1.pseudo +
                    " : " +
                    this.Joueur1.compteur_winJ1 +
                    "</p><p>" +
                    this.Joueur2.pseudo +
                    " : " +
                    this.Joueur2.compteur_winJ2 +
                    "</p></div>"
            );

            for (let i = 0; i < this.rows; i++) {
                let ligne = [];
                $("table").append("<tr>");
                for (let k = 0; k < this.cols; k++) {
                    ligne.push(0);
                    $("table").append("<th x='" + i + "' y='" + k + "'></th>");
                }
                this.puissance4.push(ligne);
                $("table").append("</tr>");
            }
            this.compte_tours();
        }

        compte_tours() {
            $(".circle1").css("background-color", this.Joueur1.couleur);
            $(".circle2").css("background-color", this.Joueur2.couleur);
            $("body").append("<div class='quijoue'>");
            $(".quijoue").append("<p>C'est au tour de <b>" + this.Joueur1.pseudo + "</b></p>");
            let that = this;

            $("th").click(function () {
                that.compteur++;

                $("#retour").prop("disabled", false);
                if (that.compteur % 2 == 0) {
                    that.couleur_actuel = that.Joueur2.couleur;
                    that.joueur_actuel = 2;
                    $(".quijoue").empty();
                    $(".quijoue").append("C'est au tour de <b>" + that.Joueur1.pseudo + "</b>");
                } else {
                    that.couleur_actuel = that.Joueur1.couleur;
                    that.joueur_actuel = 1;
                    $(".quijoue").empty();
                    $(".quijoue").append("C'est au tour de <b>" + that.Joueur2.pseudo + "</b>");
                }

                for (let i = that.puissance4.length - 1; i >= 0; i--) {
                    if (that.puissance4[i][$(this).attr("y")] == 0) {
                        $("[x=" + i + "]" + "[y=" + [$(this).attr("y")] + "]").addClass("bounce");
                        $("[x=" + i + "]" + "[y=" + [$(this).attr("y")] + "]").css("background-color", that.couleur_actuel);
                        that.position = $("[x=" + i + "]" + "[y=" + [$(this).attr("y")] + "]");
                        that.puissance4[i][$(this).attr("y")] = that.joueur_actuel;
                        break;
                    }
                }

                if (that.compteur == that.puissance4.length * that.puissance4[0].length) {
                    if (confirm("Match nul ! Souhaitez-vous rejouer ?") == true) {
                        $("body").empty();
                        that.puissance4 = [];
                        that.compteur = 0;
                        that.make_grid();
                    }
                }
                that.verification_win();
            });

            $("#retour").click(function () {
                that.compteur--;
                console.log(that.compteur);
                that.position.removeAttr("style");
                that.position.removeClass("bounce");
                let ligne_ = that.position.attr("y");
                let cols_ = that.position.attr("x");
                that.puissance4[cols_][ligne_] = 0;
                $("#retour").prop("disabled", true);
                if (that.compteur % 2 == 0) {
                    that.couleur_actuel = that.Joueur2.couleur;
                    that.joueur_actuel = 2;
                    $(".quijoue").empty();
                    $(".quijoue").append("C'est au tour de <b>" + that.Joueur1.pseudo + "</b>");
                } else {
                    that.couleur_actuel = that.Joueur1.couleur;
                    that.joueur_actuel = 1;
                    $(".quijoue").empty();
                    $(".quijoue").append("C'est au tour de <b>" + that.Joueur2.pseudo + "</b>");
                }
            });
        }

        verification_win() {
            let y = this.position.attr("y");
            let x = this.position.attr("x");

            let that = this;
            /* vérif horizontal */
            let compteur = 0;
            $.each(that.puissance4[x], function (key, value) {
                if (value == that.joueur_actuel) {
                    compteur++;
                } else {
                    compteur = 0;
                }
                if (compteur == 4) {
                    if (that.joueur_actuel == 1) {
                        that.Joueur1.compteur_winJ1++;
                        if (confirm(that.Joueur1.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                            $("body").empty();
                            that.puissance4 = [];
                            that.compteur = 0;
                            that.make_grid();
                        } else {
                            location.reload();
                        }
                    } else if (that.joueur_actuel == 2) {
                        that.Joueur2.compteur_winJ2++;
                        if (confirm(that.Joueur2.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                            $("body").empty();
                            that.puissance4 = [];
                            that.compteur = 0;
                            that.make_grid();
                        } else {
                            location.reload();
                        }
                    }
                }
            });

            /* vérif vertical */
            let compteur1 = 0;
            $.each(that.puissance4, function (key, value) {
                if (value[y] == that.joueur_actuel) {
                    compteur1++;
                } else {
                    compteur1 = 0;
                }
                if (compteur1 == 4) {
                    if (that.joueur_actuel == 1) {
                        that.Joueur1.compteur_winJ1++;
                        if (confirm(that.Joueur1.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                            $("body").empty();
                            that.puissance4 = [];
                            that.compteur = 0;
                            that.make_grid();
                        } else {
                            location.reload();
                        }
                    } else if (that.joueur_actuel == 2) {
                        that.Joueur2.compteur_winJ2++;
                        if (confirm(that.Joueur2.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                            $("body").empty();
                            that.puissance4 = [];
                            that.compteur = 0;
                            that.make_grid();
                        } else {
                            location.reload();
                        }
                    }
                }
            });

            /* vérif diagonal haut_gauche/bas_droite  */

            let Ylength = this.puissance4.length;
            let Xlength = this.puissance4[0].length;
            let maxLength = Math.max(Xlength, Ylength);
            let temp;
            for (let k = 0; k <= 2 * (maxLength - 1); ++k) {
                temp = [];
                for (let j = Ylength - 1; j >= 0; --j) {
                    let z = k - j;
                    if (z >= 0 && z < Xlength) {
                        temp.push(this.puissance4[j][z]);
                    }
                }

                if (temp.length > 0) {
                    let compteur_ = 0;
                    for (let a = 0; a < temp.length; a++) {
                        if (temp[a] == this.joueur_actuel) {
                            compteur_++;
                        } else {
                            compteur_ = 0;
                        }
                        if (compteur_ == 4) {
                            if (this.joueur_actuel == 1) {
                                this.Joueur1.compteur_winJ1++;
                                if (confirm(this.Joueur1.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                                    $("body").empty();
                                    this.puissance4 = [];
                                    this.compteur = 0;
                                    this.make_grid();
                                } else {
                                    location.reload();
                                }
                            } else if (this.joueur_actuel == 2) {
                                this.Joueur2.compteur_winJ2++;
                                if (confirm(this.Joueur2.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                                    $("body").empty();
                                    this.puissance4 = [];
                                    this.compteur = 0;
                                    this.make_grid();
                                } else {
                                    location.reload();
                                }
                            }
                        }
                    }
                }
            }

            /* vérif diagonal bas_droite/ haut_gauche*/

            let temp2;
            for (let f = 0; f <= 2 * (maxLength - 1); ++f) {
                temp2 = [];
                for (let l = Ylength - 1; l >= 0; --l) {
                    let w = f - (Ylength - l);
                    if (w >= 0 && w < Xlength) {
                        temp2.push(this.puissance4[l][w]);
                    }
                }
                if (temp2.length > 0) {
                    let _compteur = 0;
                    for (let b = 0; b < temp2.length; b++) {
                        if (temp2[b] == this.joueur_actuel) {
                            _compteur++;
                        } else {
                            _compteur = 0;
                        }
                        if (_compteur == 4) {
                            if (this.joueur_actuel == 1) {
                                this.Joueur1.compteur_winJ1++;
                                if (confirm(this.Joueur1.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                                    $("body").empty();
                                    this.puissance4 = [];
                                    this.compteur = 0;
                                    this.make_grid();
                                } else {
                                    location.reload();
                                }
                            } else if (this.joueur_actuel == 2) {
                                this.Joueur2.compteur_winJ2++;
                                if (confirm(this.Joueur2.pseudo + " a gagné ! Souhaitez-vous rejouer ?") == true) {
                                    $("body").empty();
                                    this.puissance4 = [];
                                    this.compteur = 0;
                                    this.make_grid();
                                } else {
                                    location.reload();
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});
