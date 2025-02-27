<?php
	session_start();

	include_once('class/autoload.php');
	$site = new page_base_securisee_journaliste();
	$controleur=new controleur();
	$request = strtolower($_SERVER['REQUEST_URI']);
	$params = explode('/', trim($request, '/'));
    $params = array_filter($params);
	if (!isset($params[1]))
	{
		$params[1]='accueil';
	}
	switch ($params[1]) {
		case 'accueil' :
			$site = new page_base_securisee_journaliste('Accueil');
			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> slider=$controleur->affiche_slider();
			$site-> left_sidebar=$controleur->retourne_article($site->titre);
			$site->affiche();
			break;
		case 'departement':
			$site->js='departement';
			$site->js='jquery.dataTables.min';
			$site->js='dataTables.bootstrap4.min';
			$site->css='dataTables.bootstrap4.min';
			$site-> left_sidebar=$controleur->dataTable();
			$site->affiche();
			break;
		case 'ville':
				$site->js='ville';
				$site->js='ol';
				$site->css='ol';
				$site-> left_sidebar=$controleur->affiche_combo_departement();
				$site-> left_sidebar=$controleur->affiche_combo_ville();
				$site-> left_sidebar=$controleur->affiche_info_ville();
				//$site-> left_sidebar=$controleur->ol_map();
				$site->affiche();
				break;
		case 'article':
				$site-> left_sidebar=$controleur->retourne_article_journalist();
				break;
		case 'connexion' :
			$site->js='connection';
			$site->js='all';
			$site->css='all';
			$site->titre='Connexion';
			$site->js='jquery.validate.min';
			$site->js='messages_fr';
			$site->css='tooltipster.bundle.min';
			$site->js='tooltipster.bundle.min';
			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> left_sidebar=$controleur->retourne_formulaire_login();
			$site-> left_sidebar=$controleur->retourne_modal_message();
			$site->affiche();
			break;
		case 'deconnexion' :
			$_SESSION=array();
			session_destroy();
			echo '<script>document.location.href="index.php"; </script>';
			break;
		default:
			$site->titre='Accueil';
			$site-> right_sidebar=$site->rempli_right_sidebar();
			$site-> left_sidebar='<img src="'.$site->path.'/image/erreur-404.png" alt="Erreur de liens">';
			$site->affiche();
			break;
	}


?>
