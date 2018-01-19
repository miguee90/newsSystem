<?php 
if (!empty($_POST['variable'])) {
$variable=$_POST['variable'];	
}
if ($variable==10) {
setcookie("votar",1,time()+604800);
 if(isset($_COOKIE['votar'])) {
         $_COOKIE['votar']++;
        setcookie("votar",$_COOKIE['votar'],time()+604800);
     $_COOKIE['votar'];
    } else {
    	$page = "http://globalmedia.mx/";
		$sec = "0";
		header("Refresh: $sec; url=$page");
        setcookie("votar",1,time()+604800);
        $_COOKIE['votar'];
    }}
include 'includes/funciones.php';?>
<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8" />
	<meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1.0, maximum-scale=1.0" />
	<meta name="keywords" content="noticias, san luis potosi mex, noticias de san luis potosi, noticias san luis potosi hoy, slp hoy, slp clima, san luis potosi hoy, san luis potosi clima, san luis, globalmedia, global media, Elecciones 2015, gobierno, tu voto, votaciones, gobienro san luis potosi, alcalde, diputados" />
	<meta http-equiv="Refresh" content="1600" /> 
	<meta name="google-site-verification" content="9b64HovGOZ1m-ijULNGHI2Qwb48L6Yeglwq_2bDUmrc" />
	<meta name="title" content="GlobalMedia. El portal de noticias mas completo de San Luis Potosi. Si está en San Luis esta cubierto por nosotros" />
	
	<meta name="description" content="GlobalMedia, el portal mas completo de San Luis Potosi que actualiza las noticias más relevantes en el instante en que suceden" />
	<meta name="language" content="Spanish" />
	<meta name="revisit" content="1 day" />
	<meta name="distribution" content="Global" />
	<meta name="robots" content="INDEX,FOLLOW" />
	<meta property="og:title" content="GlobalMedia. El portal de noticias mas completo de San Luis Potosi. Si está en San Luis esta cubierto por nosotros ">
	<meta property="og:site_name" content="GlobalMedia Noticias">
	<meta property="og:type" content="website"/>
	<meta property="og:image" content="img/logo-face.jpg"/>
	<meta property="og:description" content="Global Media, el portal mas completo de San Luis Potosí que actualiza las noticias más relevantes en el instante en que suceden"/>
	
	<!--link href="documentation/bootstrap/css/bootstrap.min.css" rel="stylesheet"-->
	<link href="better-weather/css/bw-style.min.css" rel="stylesheet">
<style>
		.center{
			position:absolute;
			width:700px;
			height:600px;
			top:50%;
			left:50%;
			margin-left:-350px;
			margin-top:-250px;	
		}
		
		.modalmask {
			position: fixed;
			font-family: Arial, sans-serif;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			background: rgba(0,0,0,0.8);
			z-index: 99999;
			opacity:0;
			-webkit-transition: opacity 400ms ease-in;
			-moz-transition: opacity 400ms ease-in;
			transition: opacity 400ms ease-in;
			pointer-events: none;
		}
		.modalmask:target {
			opacity:1;
			pointer-events: auto;
		}
		.modalbox{
			width: 400px;
			position: relative;
			padding: 5px 20px 13px 20px;
			background: #fff;
			border-radius:3px;
			-webkit-transition: all 500ms ease-in;
			-moz-transition: all 500ms ease-in;
			transition: all 500ms ease-in;
			
		}
		.movedown {
			margin: 0 auto;
		}
		.rotate {
			margin: 10% auto;
			-webkit-transform: scale(-5,-5); 
			transform: scale(-5,-5);
		}
		.resize {
			margin: 10% auto;
			width:0;
			height:0;
		}
		.modalmask:target .movedown{		
			margin:10% auto;
		}
		.modalmask:target .rotate{		
			transform: rotate(360deg) scale(1,1);
		    -webkit-transform: rotate(360deg) scale(1,1);
		}
		.modalmask:target .resize{
			width:400px;
			height:200px;
		}
		.close {
			background: #606061;
			color: #FFFFFF;
			line-height: 25px;
			position: absolute;
			right: 1px;
			text-align: center;
			top: 1px;
			width: 24px;
			text-decoration: none;
			font-weight: bold;
			border-radius:3px;
			font-size:16px;
		}
		.close:hover { 
			background: #FAAC58; 
			color:#222;
		}
		
		.nsc{
			position:absolute;
			bottom:40%;
			right:0;
		}
		#notificacionA {
		font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif !important;
		position: absolute !important;
		font-size:17pt !important;
		z-index: 1000 !important;
		top: 0 !important;
		left: 0 !important;
		right: 0 !important;
		background: #ffcc00 !important;
		text-align: center !important;
		line-height: 2.5 !important;
		overflow: hidden !important;
		-webkit-box-shadow: 0 0 5px black !important;
		-moz-box-shadow: 0 0 5px black !important;
		box-shadow: 0 0 5px black !important;
		-webkit-transform: translateY(-50px) !important;
		-webkit-animation: slideDown 8.5s 1.0s 1 ease !important;
		-moz-transform: translateY(-50px) !important;
		-moz-animation: slideDown 8.5s 1.0s 1 ease !important;
		}
		@-webkit-keyframes slideDown {
		0%, 100% { -webkit-transform: translateY(-50px) !important; }
		10%, 90% { -webkit-transform: translateY(0px) !important; }
		}
		@-moz-keyframes slideDown {
		0%, 100% { -moz-transform: translateY(-50px) !important; }
		10%, 90% { -moz-transform: translateY(0px) !important; }
		}
		.container{
		width: 1000px;
		padding: 0px 0;
		}
		.better-weather{
		margin-bottom: 0px;
}
</style>
 	<link rel="shortcut icon" href="img/favicon.ico"/>
	<!--link rel="apple-touch-icon" href="img/apple-touch-icon.html"/>
	<link rel="apple-touch-startup-image" href="img/startup.html" media="screen and (max-device-width: 320px)">
	<link rel="apple-touch-startup-image" href="img/startup_2x.html" media="(max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2)"-->
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<!--link rel="shortcut icon" href="img/fav.html" type="image/png"-->
	<title>GlobalMedia. El portal de noticias mas completo de San Luis Potosi. Si está en San Luis esta cubierto por nosotros</title>
	<meta name="author" content="Globalmedia">
	<!-- Citlali Gómez, Oscar Urbina, Rafael Álvarez,Francisco Corral, Erik Leija-->
	<!--[if lt IE 10]><script src="js/modernizr.custom.65274.js"></script><![endif]-->
	<!-- CSS -->
	<link href='css/bootstrap.css' rel='stylesheet' type='text/css'>
	<link href="css/font-awesome.min.css" rel="stylesheet" type='text/css'>
	<link href="css/tinyscrollbar.css" rel="stylesheet" type='text/css'>
	<!--[if IE 7]><link type='text/css' rel="stylesheet" href="css/font-awesome-ie7.min.css"><![endif]-->
	<link href='css/custom.css' rel='stylesheet' type='text/css'>
	<link href='css/imageslidermaker.css' rel='stylesheet' type='text/css'>
    <link href='css/inicio2.css' rel='stylesheet' type='text/css'>
	<!--[if lte IE 9]>
	<link type='text/css' rel="stylesheet" href="css/fonts/ie-google-webfont.css">
	<link type='text/css' rel="stylesheet" href="css/lte-ie9.css">
	<![endif]-->
	<!--[if lte IE 7]>
	<link type='text/css' rel="stylesheet" href="css/lte-ie8.css">
	<![endif]-->
	
	<script>
		
		var b = document.documentElement;
		b.setAttribute('data-useragent',  navigator.userAgent);
		b.setAttribute('data-platform', navigator.platform );
		// IE 10 == Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)
	</script>
	
	<link rel="stylesheet" href="includes/vidgal/css/flat_DarkBlueTheme.css" type="text/css" media="screen"/>
	<link rel="stylesheet" href="includes/vidgal/css/font-awesome.css" type="text/css">
	<script src="js/jquery-1.11.1.min.js"></script>
    
    
	
	
	<!--[if (gte IE 6)&(lte IE 8)]><script src="js/selectivizr-min.js"></script><![endif]-->
	<script src="js/bootstrap.js"></script>
	<script src="js/tinyscrollbar.js"></script>
	<script src="js/caroufredsel.js"></script>
	<!--[if lte IE 10]>
	<script src="js/jquery.color.js"></script>
	<script src="js/custom-lte-ie10.js"></script>
	<![endif]-->
	<script src="js/nicescroll.js"></script>
	<script src="js/custom.js"></script>
	<script src="js/imageslidermaker.js"></script>
	<style type="text/css">
		.anchorText{
					line-height: 0; 
					font-size: 0; 
					color: transparent;
			   }
	</style>
    <script src="includes/vidgal/js/froogaloop.js" type="text/javascript"></script>
	<script src="includes/vidgal/js/IScroll4Custom.js" type="text/javascript"></script>
	<script src='includes/vidgal/js/THREEx.FullScreen.js'></script>
	<script src="includes/vidgal/js/videoPlayer.js" type="text/javascript"></script>
	<script src="includes/vidgal/js/Playlist.js" type="text/javascript"></script>
	<script type="text/javascript" src="jwplayer/jwplayer.js"></script>
	<script type="text/javascript">jwplayer.key = "i3429mCuJ56cLl6Kcbm82SzpMD+XdHNan4vwkcKbu+QcxCcQ5OqbEQ==";</script>
    
</head>
<body class="clearfix" data-smooth-scrolling="1" onLoad="muestra();encuesta();">
<div class="n_page_wrapper">
	<?php include 'header.php';?>
	
<div class="n_content clearfix">
	<div class="row-fluid">
		<div class="span12">			
        <div style="margin-bottom:10px;">
        		<div style="margin-bottom:10px;">
        		<?php 
                        require_once('adminbanner2' . '/class.show.php'); 
                        $no = new NagaX; 
                        $no->startGroup(44); 
                    ?>
        </div>
        </div>
		 <?php include 'gridbigIcon.php';?>
         
         </div>
	<div style="float:left;position:relative;"></div>
	</div>
	<div class="row-fluid">
		<div class="span8">
			<div class="row-fluid carousel_block">
				<div class="span12">
					<div class="n_news_cat_list clearfix">
						<div style="width: 100%; background-color: #3b506f; float: left; margin-bottom: 15px;" ><h4 style="color: #FFF; margin-bottom: 8px; margin-top: 8px; margin-left: 4px;" class="pull-left n_news_cat_list_title">NACIONAL</h4>
							
						</div>
						<div style="margin-top: 6px; margin-right: 9px; position:relative; top:-47px;" class="met_carousel_control clearfix">
								<a href="#"><i class="icon-angle-left"></i></a>
								<a href="#"><i class="icon-angle-right"></i></a>
						</div>
						<div class="met_carousel_wrap">
							<div class="met_carousel clearfix">
								<?php
								$r=consulta("
								SELECT n.`titulo`,n.alias,  n.`Origen`,n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones` FROM notas n, secciones s, imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas AND n.`idsecciones`='3'  AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.`fecha_inicio` DESC LIMIT 0,11;								");
								
								
								while($row=mysqli_fetch_array($r))
								{
								
?>
								<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_news_cat_list_preview" style="line-height: 0; font-size: 0; color: transparent;">
											<img src="multimedia/<?php echo $row['imagenThumb']?>" 
alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>"/>Globalmedia</a>
										<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_image_hover_bg">
<img src="img/img-hover-bg.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>"/></a>
									</div>
									<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link"><h5 class="n_little_title"><?php echo $row['titulo'];?></h5></a>
									<span class="n_little_date"><?php echo $row['fecha_inicio']?></span>                                    
									<p class="n_short_descr"><?php echo $row['resumen']; ?></p>
									<a href="secciones.php?idSeccion=2" class="n_link n_color"><b><?php echo $row['nombre'];?></b></a> <img src="img/view-count.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>" class="n_view_count">
								</div>
<?php
}?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid carousel_block">
				<div class="span12">
					<div class="n_news_cat_list clearfix">
						<div style="width: 100%; background-color: rgb(80, 143, 197); float: left; margin-bottom: 15px;"><h4 style="color: #FFF; margin-bottom: 8px; margin-top: 8px; margin-left: 4px;" class="pull-left n_news_cat_list_title">INTERNACIONAL</h4>
						</div>
						<div style="margin-top: 6px; margin-right: 9px; position:relative; top:-47px;" class="met_carousel_control clearfix">
								<a href="#"><i class="icon-angle-left"></i></a>
								<a href="#"><i class="icon-angle-right"></i></a>
						</div>
						<div class="met_carousel_wrap">
							<div class="met_carousel clearfix">
								<?php
								
								$r=consulta("
								SELECT n.`titulo`,n.alias, n.`idNotas`, n.`Origen`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.fecha_final, n.`idsecciones` FROM notas n, secciones s, imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas AND n.`idsecciones`='4' AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.`fecha_inicio` DESC LIMIT 0,11;								");
								
								while($row=mysqli_fetch_array($r))
								{ 
									if(!$row['fecha_final'] || $row['fecha_final'] < date('Y-m-d H:i:s'))
									{
?>
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_news_cat_list_preview" style="line-height: 0; font-size: 0; color: transparent;">
											<img src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>" />Globalmedia</a>
										<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_image_hover_bg"><img src="img/img-hover-bg.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>" /></a>
									</div>
									<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link"><h5 class="n_little_title"><?php echo $row['titulo'];?></h5></a>
									<span class="n_little_date"><?php echo $row['fecha_inicio']?></span>                                    
									<p class="n_short_descr"><?php echo $row['resumen']; ?></p>
									<a href="secciones.php?idSeccion=3" class="n_link n_color"><b><?php echo $row['nombre'];?></b></a> <img src="img/view-count.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>" class="n_view_count">
								</div>
<?php
}
								}
?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid carousel_block">
				<div class="span12">
					<div class="n_news_cat_list clearfix">
						<div style="width: 100%; background-color: #a63e3f; float: left; margin-bottom: 15px;"><h4 style="color: #FFF; margin-bottom: 8px; margin-top: 8px; margin-left: 4px;" class="pull-left n_news_cat_list_title">DEPORTES</h4>
						</div>
						<div style="margin-top: 6px; margin-right: 9px; position:relative; top:-47px;" class="met_carousel_control clearfix">
								<a href="#"><i class="icon-angle-left"></i></a>
								<a href="#"><i class="icon-angle-right"></i></a>
							</div>
						<div class="met_carousel_wrap">
							<div class="met_carousel clearfix">
								<?php
								$r=consulta("SELECT n.`titulo`,n.alias,  n.`Origen`,  n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`,n.fecha_final, n.`idsecciones` FROM notas n, secciones s, imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas AND n.`idsecciones`='5' AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.`fecha_inicio` DESC LIMIT 0,11;
");
								
								while($row=mysqli_fetch_array($r))
								{ 
									if(!$row['fecha_final'] || $row['fecha_final'] < date('Y-m-d H:i:s'))
									{
?>
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" style="line-height: 0; font-size: 0; color: transparent;" class="n_news_cat_list_preview">
											<img src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_image_hover_bg"><img src="img/img-hover-bg.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>"/>Globalmedia</a>
									</div>
									<a href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link"><h5 class="n_little_title"><?php echo $row['titulo'];?></h5></a>
									<span class="n_little_date"><?php echo $row['fecha_inicio']?></span>                                    
									<p class="n_short_descr"><?php echo $row['resumen']; ?></p>
									<a style="" href="secciones.php?idSeccion=5" class="n_link n_color"><b><?php echo $row['nombre'];?></b></a> <img src="img/view-count.png" alt="<?php echo $row['alias'];?>" title="<?php echo $row['alias'];?>" class="n_view_count">
								</div>
<?php
}}
?>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="margin-bottom:0px!important;"class="row-fluid">
				<div class="span12">
					<div style="margin-bottom:3px;"><?php require_once('adminbanner2' . '/class.show.php'); 
						  $no = new NagaX; 
						  $no->startGroup(3); 
					?>
					</div>
					
				</div>
			</div>
			<div class="row-fluid carousel_block">
				<div class="span12">
					<div class="n_news_cat_list clearfix">
						<div style="width: 100%; background-color: #335566; float: left; margin-bottom: 15px;"><h4 style="color: #FFF; margin-bottom: 8px; margin-top: 8px; margin-left: 4px;" class="pull-left n_news_cat_list_title">LÍDERES DE OPINIÓN</h4>
						</div>
						<div style="margin-top: 6px; margin-right: 9px; position:relative; top:-47px;" class="met_carousel_control clearfix">
								<a href="#"><i class="icon-angle-left"></i></a>
								<a href="#"><i class="icon-angle-right"></i></a>
							</div>
						<div class="met_carousel_wrap">
							<div class="met_carousel clearfix">
								
<?php
require_once('blog/rss_fetch.inc');
define("MAGPIE_CACHE_DIR", "/tmp/mysite_magpie_cache");
define("MAGPIE_CACHE_ON", 1);
define("MAGPIE_CACHE_AGE", 30); 
?>
								<!--JASSIA CHARLES--><!--							
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://jassiacharles.blogspot.mx" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROJASSIA.jpg" alt="Blog Jassia Charles" title="Blog Jassia Charles" width="236" height="113" />
										</a>
										<a href="http://jassiacharles.blogspot.mx" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROJASSIA.jpg" alt="Blog Jassia Charles" title="Blog Jassia Charles" width="236" height="113" /></a>
									</div>
									<a href="http://jassiacharles.blogspot.mx" target="_blank" class="n_title_link"><h5 class="n_little_title">De Pesos y Centavos</h5></a>
									<span class="n_little_date">Por Jassia Charles</span>
									<p class="n_short_descr"><?php/*
$rss = fetch_rss("http://jassiacharles.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://jassiacharles.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
*/?></p>
									<span class="n_view_counter"></span>
								</div>-->
								<!--PLUMAS NACIONALES-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://plumasnacionales.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTRONACIONALES.jpg" alt="Blog Plumas Nacionales" title="Blog Plumas Nacionales" width="236" height="113"/>Globalmedia</a>
										<a href="http://plumasnacionales.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTRONACIONALES.jpg" alt="Blog Plumas Nacionales" title="Blog Plumas Nacionales" width="236" height="113" /></a>
									</div>
									<a href="http://plumasnacionales.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Plumas Nacionales</h5></a>
									<span class="n_little_date">Por varios columnistas</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://plumasnacionales.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://plumasnacionales.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--ERIKA SALGADO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://opinionerikasalgado.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROSALGADO.jpg" alt="Blog Erika Salgado" title="Blog Erika Salgado" width="236" height="113"/>Globalmedia</a>
										<a href="http://opinionerikasalgado.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROSALGADO.jpg" alt="Blog Erika Salgado" title="Blog Erika Salgado" width="236" height="113"/></a>
									</div>
									<a href="http://opinionerikasalgado.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">En la opinón de Erika Salgado</h5></a>
									<span class="n_little_date">Por Erika Salgado</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://opinionerikasalgado.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://opinionerikasalgado.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--JUAN CARLOS MENDEZ>
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://balancesyperspectiva.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROCARLOSMENDEZ.jpg" alt="Blog Balance Y perspectiva" title="Blog Balance Y perspectiva" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://balancesyperspectiva.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROCARLOSMENDEZ.jpg" alt="Blog Balance Y perspectiva" title="Blog Balance Y perspectiva" width="236" height="113"/>Globalmedia</a>
									</div>
									<a href="http://balancesyperspectiva.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Balances y Perspectivas</h5></a>
									<span class="n_little_date">Por Juan Carlos Méndez</span>
									<p class="n_short_descr"><?php /*
$rss = fetch_rss("http://balancesyperspectiva.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://balancesyperspectiva.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
*/
?></p>
									<span class="n_view_counter"></span>
								</div-->
								<!--BEATRIZ GONZALEZ--><!--
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://escapatebeatrizgonzalez.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROBEATRIZ.jpg" alt="Blog Beatriz Gonzales" title="Blog Beatriz Gonzales" width="236" height="113"/>
										</a>
										<a href="http://escapatebeatrizgonzalez.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROBEATRIZ.jpg" alt="Blog Beatriz Gonzales" title="Blog Beatriz Gonzales" width="236" height="113"/></a>
									</div>
									<a href="http://escapatebeatrizgonzalez.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Escápate</h5></a>
									<span class="n_little_date">Por Beatriz González</span>
									<p class="n_short_descr"><?php/*
$rss = fetch_rss("http://escapatebeatrizgonzalez.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://escapatebeatrizgonzalez.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
*/?></p>
									<span class="n_view_counter"></span>
								</div>		-->
                             	<!--Raúl Espinoza-->
				<div class="met_carousel_column">
					<div class="n_cat_list_image">
                    	<a style="line-height: 0; font-size: 0; color: transparent;" href="http://tacticamentehablando.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
                        	<img src="blog/img/INTRORAUL.jpg" alt="Blog Columna de Raúl Espinoza" 
                            title="Blog Columna de Raúl Espinoza" width="236" height="113"/>Globalmedia
                     	</a>
						<a style="line-height: 0; font-size: 0; color: transparent;" href="http://tacticamentehablando.blogspot.mx/" 
                        	target="_blank" class="n_image_hover_bg">
                        <img src="blog/img/INTRORAUL.jpg" alt="Blog Columna de Raúl Espinoza" 
                        	title="Blog Columna de Raúl Espinoza" width="236" height="113"/>Globalmedia</a>
					</div>
						<a href="http://tacticamentehablando.blogspot.mx" target="_blank" class="n_title_link">
                        	<h5 class="n_little_title">Tácticamente Hablando</h5>
                        </a>
						<span class="n_little_date">Por Raúl Espinoza </span>
							<p class="n_short_descr"><?php
                            $rss = fetch_rss("http://tacticamentehablando.blogspot.mx/feeds/posts/default");
							$items = array_slice($rss->items, 0, 1);
							foreach ($items as $item)
							{
								echo "<a href=http://tacticamentehablando.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
							} 
?></p>
							<span class="n_view_counter"></span>
			</div>
                                						
								<!--OTRO ANGULO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://otroangulointernet.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/OTROANGULO.jpg" alt="Blog Otro Angulo" title="Blog Otro Angulo" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://otroangulointernet.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/OTROANGULO.jpg" alt="Blog"  alt="Blog Otro Angulo" title="Blog Otro Angulo" width="236" height="113" >Globalmedia</a>
									</div>
									<a href="http://otroangulointernet.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Otro Ángulo</h5></a>
									<span class="n_little_date">Por Otro Ángulo</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://otroangulointernet.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://otroangulointernet.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>								
								<!--CARLOS DRAGONNE-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://carlosdragonne.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTRODRAGONNE.jpg"  alt="Blog Carlos Dragonne" title="Blog Carlos Dragonne" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://carlosdragonne.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTRODRAGONNE.jpg"  alt="Blog Carlos Dragonne" title="Blog Carlos Dragonne" width="236" height="113"/>Globalmedia</a>
									</div>
									<a href="http://carlosdragonne.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Corte y Queda</h5></a>
									<span class="n_little_date">Por Carlos Dragonne</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://carlosdragonne.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://carlosdragonne.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>								
								<!--QUEBRADERO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://quebradero.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROANTONIO.jpg" alt="Blog Quebradero" title="Blog Quebradero" width="236" height="113" />Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://quebradero.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROANTONIO.jpg" alt="Blog Quebradero" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://quebradero.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Quebradero</h5></a>
									<span class="n_little_date">Por Antonio González</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://quebradero.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://quebradero.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--DE POLO A POLO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://depoloapoloblog.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROPOLO.jpg" alt="Blog De Polo A Polo" title="Blog De Polo A Polo" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://depoloapoloblog.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROPOLO.jpg" alt="Blog De Polo A Polo" title="Blog De Polo A Polo" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://depoloapoloblog.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">De polo a polo</h5></a>
									<span class="n_little_date">Por Marco Luis Polo</span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://depoloapoloblog.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://depoloapoloblog.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--MUJER ES MARAVILLA--><!--
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://marthallanoblog.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROMARTHA.jpg" alt="Blog Mujer es maravilla" title="Blog Mujer es maravilla" width="236" height="113"/>
										</a>
										<a href="http://marthallanoblog.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROMARTHA.jpg" alt="Blog Mujer es maravilla" title="Blog Mujer es maravilla" width="236" height="113" /></a>
									</div>
									<a href="http://marthallanoblog.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Mujer es maravilla</h5></a>
									<span class="n_little_date">Por Martha Llano</span>
									<p class="n_short_descr"><?php/*
$rss = fetch_rss("http://marthallanoblog.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://marthallanoblog.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
*/?></p>
									<span class="n_view_counter"></span>
								</div>-->
								<!--EL APRENDIZ>
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://elaprendizbl.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROPABLO.jpg" alt=""/>
										</a>
										<a href="http://elaprendizbl.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROPABLO.jpg" alt="" /></a>
									</div>
									<a href="http://elaprendizbl.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">El aprendiz</h5></a>
									<span class="n_little_date">Por Pablo Loredo Oyervidez</span>
									<p class="n_short_descr"><?php
//$rss = fetch_rss("http://elaprendizbl.blogspot.com/feeds/posts/default");
//$items = array_slice($rss->items, 0, 1);
//foreach ($items as $item)
//{
//echo "<a href=http://elaprendizbl.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
//} 
?></p>
									<span class="n_view_counter"></span>
								</div-->
								<!--LA COLUMNA DE MIGUEL ANGEL-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://colmiguelcalvillo.blogspot.mx/" target="_blank" class="n_news_cat_list_preview"><img src="blog/img/INTROMIGUELANGEL.jpg" alt="Blog Columna de Miguel Angel" title="Blog Columna de Miguel Angel" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://colmiguelcalvillo.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROMIGUELANGEL.jpg" alt="Blog Columna de Miguel Angel" title="Blog Columna de Miguel Angel" width="236" height="113"/>Globalmedia</a>
									</div>
									<a href="http://colmiguelcalvillo.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">La columna de Miguel Angel</h5></a>
									<span class="n_little_date">Por Miguel Ángel Hernández Calvillo </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://colmiguelcalvillo.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://colmiguelcalvillo.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--LINEA DE CLIO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://orestalopez.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROORESTA.jpg" alt="Blog Líneas de Clío" title="Blog Líneas de Clío" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://orestalopez.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROORESTA.jpg" alt="Blog Líneas de Clío" title="Blog Líneas de Clío" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://orestalopez.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Líneas de Clío</h5></a>
									<span class="n_little_date">Por Oresta López </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://orestalopez.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://orestalopez.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--ENTRE LINEAS TRAZOS Y CURVAS-->
								<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://emiliozaga.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROCOHEN.jpg" alt="Blog Entre Lineas Trazos Y Curvas" title="Blog Entre Lineas Trazos Y Curvas" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://emiliozaga.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROCOHEN.jpg" alt="Blog Entre Lineas Trazos Y Curvas" title="Blog Entre Lineas Trazos Y Curvas" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://emiliozaga.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Entre líneas, trazos y curvas</h5></a>
									<span class="n_little_date">Por Emilio Cohen Zaga </span>
									<p class="n_short_descr"><?php
					$rss = fetch_rss("http://emiliozaga.blogspot.com/feeds/posts/default");
					$items = array_slice($rss->items, 0, 1);
					foreach ($items as $item)
					{
					echo "<a href=http://emiliozaga.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
					} 
					?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--OBSERVANDO LA CIUDAD-->
					<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://benjaminalva.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROBENJAMIN.jpg" alt="Blog Observando la ciudad" title="Blog Observando la ciudad" width="236" height="113"/>
										</a>
										<a href="http://benjaminalva.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROBENJAMIN.jpg" alt="Blog Observando la ciudad" title="Blog Observando la ciudad" width="236" height="113" /></a>
									</div>
									<a href="http://benjaminalva.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Observando la ciudad</h5></a>
									<span class="n_little_date">Por Benjamin Alva </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://benjaminalva.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://benjaminalva.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--LIDERAZGO QUE TRANSFORMA-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://liderazgoquetransformaht.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTROTREJO.jpg" alt="Blog liderazgo que transforma" title="Blog liderazgo que transforma" width="236" height="113"/>
										</a>
										<a href="http://liderazgoquetransformaht.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROTREJO.jpg" alt="Blog liderazgo que transforma" title="Blog liderazgo que transforma" width="236" height="113" /></a>
									</div>
									<a href="http://liderazgoquetransformaht.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">Liderazgo que transforma</h5></a>
									<span class="n_little_date">Por Hector Trejo </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://liderazgoquetransformaht.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://liderazgoquetransformaht.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--FILOSOFO DE GUEMEZ-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a href="http://elfilosofodeguemezgm.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
											<img src="blog/img/INTRORAMON.jpg" alt="Blog Filosofo de guemez" title="Blog Filosofo de guemez" width="236" height="113"/>
										</a>
										<a href="http://elfilosofodeguemezgm.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTRORAMON.jpg" alt="Blog Filosofo de guemez" title="Blog Filosofo de guemez" width="236" height="113" /></a>
									</div>
									<a href="http://elfilosofodeguemezgm.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">El filósofo de Güémez</h5></a>
									<span class="n_little_date">Por Ramón Durón Ruiz </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://elfilosofodeguemezgm.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://elfilosofodeguemezgm.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--UNO CERO-->
<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://unocerogm.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROUNO.jpg" alt="Blog Uno Cero" title="Blog Uno Cero" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://unocerogm.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROUNO.jpg" alt="Blog Uno Cero" title="Blog Uno Cero" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://unocerogm.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">UNOCERO</h5></a>
									<span class="n_little_date">Por UNOCERO </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://unocerogm.blogspot.com/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://unocerogm.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
								<!--VERONICA MARTINEZ-->
								<?php /*
								<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://veronicamartinezgm.blogspot.mx/" target="_blank" class="n_news_cat_list_preview">
										<img src="blog/img/INTROVERO.jpg" alt="Blog Veronica Martinez" title="Blog Veronica Martinez" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://veronicamartinezgm.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/INTROVERO.jpg" alt="Blog Veronica Martinez" title="Blog Veronica Martinez" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://veronicamartinezgm.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">De periodismo y dinamismo empresarial</h5></a>
									<span class="n_little_date">Por Verónica Martínez </span>
									<p class="n_short_descr"><?php
									$rss = fetch_rss("http://veronicamartinezgm.blogspot.com/feeds/posts/default");
									$items = array_slice($rss->items, 0, 1);
									foreach ($items as $item)
									{
									echo "<a href=http://veronicamartinezgm.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
									} 
									?></p>
									<span class="n_view_counter"></span>
								</div> */ ?>
								<!--Jose Luis Camacho-->
								<div class="met_carousel_column">
									<div class="n_cat_list_image">
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://joseluiscamachogm.blogspot.mx/" target="_blank" class="n_news_cat_list_preview"><img src="blog/img/camacho.jpg" alt="Blog Veronica Martinez" title="Blog Jose Luis Camacho" width="236" height="113"/>Globalmedia</a>
										<a style="line-height: 0; font-size: 0; color: transparent;" href="http://joseluiscamachogm.blogspot.mx/" target="_blank" class="n_image_hover_bg"><img src="blog/img/camacho.jpg" alt="Blog Jose Luis Camacho" title="Blog Veronica Martinez" width="236" height="113" />Globalmedia</a>
									</div>
									<a href="http://joseluiscamachogm.blogspot.mx/" target="_blank" class="n_title_link"><h5 class="n_little_title">José Luis Camacho</h5></a>
									<span class="n_little_date">Por José Luis Camacho </span>
									<p class="n_short_descr"><?php
$rss = fetch_rss("http://joseluiscamachogm.blogspot.mx/feeds/posts/default");
$items = array_slice($rss->items, 0, 1);
foreach ($items as $item)
{
echo "<a href=http://joseluiscamachogm.blogspot.mx/ target='_blank'>".utf8_encode($item["title"])."".utf8_encode($item["description"])."</a>";
} 
?></p>
									<span class="n_view_counter"></span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row-fluid">
				<div class="span12">
                	<a href="trascendidos.php">
                    	<img style="margin-bottom:2px; float:left;" class="n_met_ad" src="img/banner-trascendidos.jpg" alt="trascendidos"/>
                    </a> 
                    <a href="http://globalmedia.mx/Denunciante">
                    	<img style="margin-bottom:2px; float:left;" class="n_met_ad" src="img/banner-denunciante.jpg" alt="denunciante"/>
                    </a> 
                    
                    
                    <?php
                     /*<a href="#">
                    <img style="width:50%; float:left;" class="n_met_ad" src="img/misa.jpg" alt=""/>
                    </a>
                    <a href="#">
                    <img style="width:50%; float:left;" class="n_met_ad" src="img/emergencia.jpg" alt=""/>
                    </a>*/?>
                    <!--a href="#" class="anchorText">
                		<img style="float:left; margin-top:2px;" src="img/banner-denunciante-urbano.jpg" alt="Denunciante Urbano">
                        Globalmedia
                  	</a-->           
            	</div>
			</div>
			
			<div id="estaciones"><div id="imageslider">
							<ul class="bjqs">
							<li class="slide-1">
								<a href="reppoder.php?sel=hundred" target="_blank"><div style="width:430px;height:100px;"></div></a>
								<a href="reppoder.php?sel=imagen" target="_blank"><div style="width:430px;height:100px;"></div></a>
							</li>
							<li class="slide-2">
								<a href="reppoder.php?sel=exa" target="_blank"><div style="width:430px;height:100px;"></div></a>
								<a href="reppoder.php?sel=formula" target="_blank"><div style="width:430px;height:100px;"></div></a>
							</li>
							<li class="slide-3">
								<a href="reppoder.php?sel=poder" target="_blank"><div style="width:430px;height:100px;"></div></a>
                                <a href="tv.php" target="_blank"><div style="width:430px;height:100px;"></div></a>
								
							</li>
						</ul>
					</div>
					<img src="img/escuchanos.jpg" alt="Escuchanos en Linea" width="261" height="200"/>
					<!--img src="img/mesaanalisis.jpg" alt=""/-->
					</div>
					<div id="estaciones2">
						<a class="anchorText" href="movil-hundred.html" target="_blank"><img src="img/hundred-b.png" alt=""/>Globalmedia</a>
						<a class="anchorText" href="tv.php" target="_blank"><img src="img/vive-b.png" alt=""/>Globalmedia</a>
						<a class="anchorText" href="movil-exa.html" target="_blank"><img src="img/exa-b.png" alt="Exa Radio" width="125" height="100"/>Globalmedia</a>
						<a class="anchorText" href="movil-formula.html" target="_blank"><img src="img/formula-b.png" alt=""/>Globalmedia</a>
						<a class="anchorText" href="movil-poder.html" target="_blank"><img src="img/poder-b.png" alt=""/>Globalmedia</a>
						<a class="anchorText" href="movil-imagen.html" target="_blank"><img src="img/imagen-b.png" alt=""/>Globalmedia</a>
					</div>
			<div class="row-fluid">
				<div class="span12"><?php 
					$fecha=date("D");
					$hora=date("H:i");
					//div de Tv que se activa de 6:30 am a 10 am y de 9pm a 10 pm
				
					if ((($fecha!='Sun')&&($fecha!='Sat'))&&(($hora>='06:30')&&($hora<='10:00'))||(($hora>='21:00')&&($hora<='22:00'))) {
					$useragent=$_SERVER['HTTP_USER_AGENT'];
					if(preg_match('/iPhone|iPod|iPad|android|avantgo|blackberry|NetCast|SmartTV|IEMobile|blazer|compal|elaine|fennec|hiptop|iris|kindle|lge |maemo|midp|mmp|mobile|o2|opera mini|palm( os)?|plucker|pocket|pre\/|psp|smartphone|symbian|treo|up\.(browser|link)|vodafone|wap|webos|wos|windows ce; (iemobile|ppc)|xiino/i',$useragent)||preg_match('/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i',substr($useragent,0,4))){
						?>   
						<br>
					<div style="width:250px;margin:0px auto;"><img src="img/noticieros.jpg"></div>	
					<div style="display:block; width:320px; height: auto; margin-left:auto; margin-right:auto; background color:#666666; ">
					<video width="320" height="240"controls autoplay src="http://38.96.148.213:1935/vivecanaltest/myStream.sdp/playlist.m3u8">Requiere HTML 5</video>
					</div>
					<?php
						} else{ ?> 
					<div id="player" style="margin:0px auto;background-color:#000;">
						<div style="MAX-width:632px; margin: 0px auto; display:block;">
							<div id='VivecanalGlobalMedia' style="display:block;margin:0px auto;"></div>
							<script type="text/javascript">
								jwplayer("VivecanalGlobalMedia").setup({
								file: "rtmp://38.96.148.213:1935/vivecanaltest/myStream.sdp",
								// image: 'http://vivecanal.tv/wp-content/uploads/2014/05/padres_web.jpg',
								title: 'TV en vivo',
								width: '100%',
								autostart: true,
								aspectratio: '16:9',
								modes:[
            						{ type:'html5' }
        						]
								});
							</script>
						</div>
					</div>
					<?php }} else {
						
							include 'includes/vidgal/js/vidgal.php';?>
							<div id="video"></div>
							<?php
						}
					 ?></div>
			</div>
			
		</div>
		<div class="span2">
			<div class="row-fluid">
				<div class="span12">
				<!--Incluimos el twitter de globalmedia-->
			    <div id="twitter">
            	<a class="twitter-timeline" href="https://twitter.com/Globalmediamx" data-widget-id="607237642413993985" width="90%" height="248">Tweets por el @Globalmediamx.</a>
				<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
				</div>
				</br>
				<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
				</br>
				<!--Termina el twitter de globalmedia.mx..-->
				<h4 class="n_news_cat_list_title">LAS MAS VISTAS</h4>
					<?php $r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=1 ORDER BY hits DESC LIMIT 0,3");
									
										while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php } 
					$r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=3 ORDER BY hits DESC LIMIT 0,2");
					
					while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php } 
					$r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=4 ORDER BY hits DESC LIMIT 0,1");
					
					while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php } 
					$r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=5 ORDER BY hits DESC LIMIT 0,2");
					
					while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php } 
					
					$r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=2 ORDER BY hits DESC LIMIT 0,1");
					
					while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a  style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php } 
					$r=consulta("SELECT n.`titulo`,n.alias, n.`Origen`, n.`idNotas`, s.nombre, n.resumen, i.*, n.prioridad, n.`fecha_inicio`, n.`idsecciones`, IFNULL(h.hits,0)AS hits FROM prueba1g_globaldb.notas n LEFT JOIN prueba1g_globalhits.hits h ON n.idNotas=h.idNotas AND `fecha_inicio` > DATE_SUB(NOW(), INTERVAL 24 HOUR),   prueba1g_globaldb.secciones s, prueba1g_globaldb.imagenes i WHERE n.`idsecciones`= s.`idsecciones` AND s.especial=0 AND i.idNotas=n.idNotas  AND n.status=1  AND n.`idsecciones`=6 ORDER BY hits DESC LIMIT 0,1");
					
					while($row=mysqli_fetch_array($r))
										{ 
?>  
					<div class="n_latest_post_container clearfix">
						<a style="line-height: 0; font-size: 0; color: transparent;" href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_latest_post_picture"><img style="width:50px;height:50px;"src="multimedia/<?php echo $row['imagenThumb']?>" alt="<?php echo $row['alias'];?>" />Globalmedia</a>
						<div class="n_latest_post_details">
							<a  href="noticia/<?php echo $row['idNotas'];?>/<?php echo $row['alias'];?>" class="n_title_link">
<h5 class="n_little_title"><?php echo $row['titulo']; ?></h5></a>
							<span class="n_little_date"><?php echo $row['fecha_inicio']; ?></span>
						</div>
					</div>
					<div class="n_splitter_2"><span class="n_bgcolor"></span></div>
					<?php }?>
				</div>
			</div>
            
    <div style="clear:both;"></div>
            
			<div class="n_small_block ">
				<div class="span12 index-banner">
				<?php 					
					require_once('adminbanner2' . '/class.show.php'); 
					$no = new NagaX; 
					$no->startGroup(6); 
				?>
				</div>
			</div>
			
            <div class="n_small_block ">
				<div class="span12 index-banner">
					<?php 
			require_once('adminbanner2' . '/class.show.php'); 
			$no = new NagaX; 
			$no->startGroup(5); 
			?>
				</div>
			</div>
		
            <div class="n_small_block ">
				<div class="span12 index-banner">
					
                    
                    <?php 
			require_once('adminbanner2' . '/class.show.php'); 
			$no = new NagaX; 
			$no->startGroup(4); 
			?>
                   
				</div>
			</div>
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12 index-banner">
				
					<?php 
                        require_once('adminbanner2' . '/class.show.php'); 
                        $no = new NagaX; 
                        $no->startGroup(26); 
                    ?>
				</div>
			</div>
 </div>
		<div class="span2">
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
					<h4 class="n_news_cat_list_title">MONERO DE HOY</h4>
					<?php 				
						$qMonero="SELECT n.`idNotas`, n.`titulo`,  n.`fecha_inicio`, i.* FROM `notas` n , imagenes i WHERE idsecciones=13 AND i.idNotas=n.idNotas AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.fecha_inicio DESC LIMIT 0,1";
						$resMon=consulta($qMonero);
						$rowMon=mysqli_fetch_array($resMon);
						$dateMonero=date(D);		
						
						if (($dateMonero==Sat)||($dateMonero==Sun)) { ?>
						<a href="monero" class="anchorText"><img src="img/monero.jpg" alt=""/>Globalmedia</a>
						<a href="monero" class="n_title_link"><h5 class="n_little_title"><?php  echo $rowMon['titulo']; ?></h5></a>                	
						<?php } else{	?>
						<a class="anchorText" href="monero"><img src="multimedia/<?php echo $rowMon['imagenPortada']?>"  width="170" height="176" alt=""/>Globalmedia</a>
						<a href="monero" class="n_title_link"><h5 class="n_little_title"><?php  echo $rowMon['titulo']; ?></h5></a>
						<span class="n_little_date"><?php  echo $rowMon['fecha_inicio']; ?></span>
						<?php }  ?>                 
						<p class="n_short_descr n_without_margin"></p>
						<?php 
/*
					
						$qMonero="SELECT n.`idNotas`, n.`titulo`, n.`fecha_inicio`, i.* FROM `notas` n , imagenes i WHERE idsecciones=13 AND i.idNotas=n.idNotas  AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.fecha_inicio DESC LIMIT 0,1";
						$resMon=consulta($qMonero);
						$rowMon=mysqli_fetch_array($resMon);
						
					?>
					 
<a href="monero"><img src="multimedia/<?php echo $rowMon['imagenPortada']?>" alt="" width="170"/></a>
<a href="monero" class="n_title_link"><h5 class="n_little_title"><?php  echo $rowMon['titulo']; ?></h5></a>
<span class="n_little_date"><?php  echo $rowMon['fecha_inicio']; ?></span>
<p class="n_short_descr n_without_margin"></p>
*/?>
				</div>
			</div>
<div class="row-fluid n_small_block n_text_align_center">
<div class="span12">
<h4 class="n_news_cat_list_title">PURGATORIO</h4>
<?php 
					
						$qPurgatorio="SELECT n.`idNotas`, n.`titulo`,  n.`fecha_inicio`, i.* FROM `notas` n , imagenes i WHERE idsecciones=14 AND i.idNotas=n.idNotas AND n.status=1 AND n.fecha_inicio<= NOW() ORDER BY n.fecha_inicio DESC LIMIT 0,1";
						$resPurg=consulta($qPurgatorio);
						$rowPurga=mysqli_fetch_array($resPurg);
					$datePurgatorio=date(D);
					
					if ($datePurgatorio==Mon) {		
					?>
<a class="anchorText" href="purgatorio"><img src="multimedia/<?php echo $rowPurga['imagenPortada']?>"  width="170" height="176" alt=""/>Globalmedia</a>
<a href="purgatorio" class="n_title_link"><h5 class="n_little_title"><?php  echo $rowPurga['titulo']; ?></h5></a>
<span class="n_little_date"><?php  echo $rowPurga['fecha_inicio']; ?></span>
<?php } 
elseif ($datePurgatorio!=Mon) { ?>
<a class="anchorText" href="purgatorio"><img src="img/purgatorio.jpg" alt=""/>Globalmedia</a>
<a href="purgatorio" class="n_title_link"><h5 class="n_little_title"><?php  echo $rowPurga['titulo']; ?></h5></a>                    	
<?php } ?>                   
<p class="n_short_descr n_without_margin"></p>
</div>
</div>
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12 index-banner">
					<h4 class="n_news_cat_list_title">EL CLIMA</h4>
					<div class="container">
<div class="row better-weather-examples">
<div class="row">
<div style="max-width:170px;" class="col-lg-11 col-md-12">
<div id="weather-6"></div>
</div>
</div>
</div>
</div><br/>
<a href="Clima">Ver más del clima.</a>
<script src="better-weather/js/skycons.js"></script>
<script src="better-weather/js/elementQuery.min.js"></script>
<script src="better-weather/js/betterweather.min.js"></script>
		<!--script src="documentation/bootstrap/js/bootstrap.min.js"></script-->
<script type='text/javascript'>
var BW_Localized = {
apiKey: '6c62eb2c037ed691c94878e7bbd56743',
monthList: {
January     : 'Enero',
February    : 'Febrero',
March       : 'Marzo',
April       : 'Abril',
May         : 'Mayo',
June        : 'Junio',
July        : 'Julio',
August      : 'Agosto',
September   : 'Septiembre',
October     : 'Octubre',
November    : 'Noviembre',
December    : 'Diciembre'
},
daysList: {
Sat : 'Sab',
Sun : 'Dom',
Mon : 'Lun',
Tue : 'Mar',
Wed : 'Mie',
Thu : 'Jue',
Fri : 'Vie'
},
stateList: {
clear           : 'Despejado',
rain            : 'Lluvia',
snow            : 'Nieve',
sleet           : 'Aguanieve',
wind            : 'Viento',
fog             : 'Neblina',
cloudy          : 'Nublado',
mostly_cloudy   : 'Mayormente nublado',
partly_cloudy   : 'Parcialmente nublado',
thunderstorm    : 'Tormenta eléctrica',
drizzle         : 'Llovizna',
light_Rain      : 'Lluvias ligeras',
overcast        : 'Nublado'
}
} ;
</script>
<script>
//            var doc_ajax_url = "../better-weather/ajax/ajax.php";
var doc_ajax_url = "http://better-studio.net/plugins/better-weather/better-weather/ajax/ajax.php";
</script>
<script>
(function($){
$('#weather-6').betterWeather({
apiKey: "6c62eb2c037ed691c94878e7bbd56743",
style:  "modern",
nextDays: false ,
bgColor: '#333',
location: '22.1444,-100.9567',
locationName: 'San Luis Potosí, MX',
animatedIcons: true,
url         :   doc_ajax_url
});
// Hack for element query on local/cross domain
elementQuery({".better-weather":{"max-width":["2000px","1170px","970px","830px","650px","550px","400px","300px","170px","100px","50px"]}});
})(jQuery);
</script>
					<?php #include 'widget-clima.html';?>
					
				</div>
			</div>
			
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">CARTELERA</h4>
					<a class="anchorText" href="http://cinemex.com/cine/175/cinemex-citadella" target="_blank"><img src="img/cartelera.jpg" alt="Caretelera de Cinemex" width="170" height="175" />Globalmedia</a>
				</div>
			</div>
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">RESUMEN DEL DÍA</h4>
					<a href="Resumen-12"><img src="img/boletin-gobierno.jpg" alt="Boletín"/></a>
				</div>
			</div>
			
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">ENCUESTA</h4>
					<?php include 'doughnut.php'; 
					?>
					
					
				</div>
			</div> 
			
			<?php /*<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">ENCUESTA</h4>
					<?php include 'doughnut.php'; ?>
				</div>
			</div>*/ ?>
			
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">HORÓSCOPOS</h4>
					<a href="horoscopos.php" class="anchorText"><img src="img/horoscopos.png" alt="Horóscopos"/>Globalmedia</a>
				</div>
			</div>
			<div class="row-fluid n_small_block n_text_align_center">
				<div class="span12">
				<h4 class="n_news_cat_list_title">BURRO NEGRO</h4>
					<a class="anchorText" href="http://globalmedia.mx/exa.php" target="_blank"><img src="img/banner-pagina-global-home.jpg" alt="BURRO NEGRO"/>Globalmedia</a>
				</div>
			</div>
			<div class="row-fluid n_small_block n_text_align_center n_hide">
<div class="span12">
<div class="pull-left">
</div>
</div>
</div>
		</div>
	</div>
	<div class="n_splitter"><span class="n_bgcolor"></span></div>
	<div class="row-fluid">
		<div class="span12">
			<?php /*<div id="fb-root"></div>
			<script>(function(d, s, id) {
					var js, fjs = d.getElementsByTagName(s)[0];
					if (d.getElementById(id)) return;
					js = d.createElement(s); js.id = id;
					js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1&appId=216551661819310";
					fjs.parentNode.insertBefore(js, fjs);
				}(document, 'script', 'facebook-jssdk'));</script>
			<div class="fb-like" data-href="https://www.facebook.com/GlobalMediaSLP" data-send="true" data-width="" data-show-faces="true" data-font="arial"></div>
		*/?>
		</div>
	</div>
</div>
	<?php //include 'footer.php';?>
    
    <footer style="a{color:#FFFFFF;}"class="clearfix">
		<div class="n_footer_head"style="height:20px;">
			<div style="margin-left:auto; margin-right:auto; width:370px;"><h1 style=" font-size:12px; color:#EBF5FD; margin-left:auto; margin-right:auto;">
	www.globalmedia.mx Noticias de San Luis, Nacionales, TV y radio
</h1></div>
		</div>
		<div id="extras">
			<div style="margin:auto;max-width:840px;">
				<div class="col">
					<ul>
						<li><a href="http://globalmedia.mx/Sanluis">San Luis</a></li>
						<li><a href="http://globalmedia.mx/Seguridad">SEGURIDAD</a></li>
						<li><a href="http://globalmedia.mx/Nacional">Nacional</a></li>
						<li><a href="http://globalmedia.mx/Internacional">Internacional</a></li>
					</ul>
				</div>
				<div class="col" >
					<ul>
						<li><a href="http://globalmedia.mx/Actualidad">Actualidad</a></li>
						<li><a href="http://globalmedia.mx/Deportes/local">Deportes</a></li>
						<li><a href="http://globalmedia.mx/Negocios">Negocios</a></li>
						<li><a href="http://globalmedia.mx/Estados">Estados</a></li>
						
					</ul>
				</div>
				<div class="col">
					<ul>
						<li><a href="http://globalmedia.mx/Espectaculos">Espectáculos</a></li>
						<li><a href="contacto">Contacto</a></li>
						<li><a href="http://globalmedia.mx/Fotogaleria/Local.php">Fotogalerías</a></li>
						
					</ul>
				</div>
				<div class="col end"style="float: left; margin-bottom:5px;padding-right: 50px;">
					<ul>
						<li><a href="Formula/formula.php">Podcast</a></li>
						<li><a href="#'">&nbsp;</a></li>
						<li>&nbsp;</li>
						<li>&nbsp;</li>
					</ul>
				</div>
			</div>
	<div style="float:right;height:10px;width:100px;margin-right:20px;" class="n_content clearfix">
		<a href="#" class="n_footer_back_to_top pull-right"><i class="icon-caret-up"></i>&nbsp;&nbsp;Ir hacia arriba</a>
	</div>
</div>
<!--div style="width: 46%;margin:auto;"><p style="text-align: center"><a href="index.php"><img style="vertical-align:sub;margin-right:5px;" src="img/logo-pie.png"></a>TODOS LOS DERECHOS RESERVADOS, COPYRIGHT 2014</p></div-->
<div style="width: 46%;margin:auto;"><p style="text-align: center"><a href="index.php"><img style="vertical-align:sub;margin-right:5px;" src="img/logo-pie.png"></a>© 2015 Global Media Comunicaciones. Todos los derechos reservados. Prohibida la reproducción total o parcial, incluyendo cualquier medio electrónico o magnético.</p></div>
	</footer>
    
    
	
</div>
</body>
<script type="text/javascript">
		var nav = navigator.appName; 
		if(nav == "Microsoft Internet Explorer"){
		// Convertimos en minusculas la cadena que devuelve userAgent
		var ie = navigator.userAgent.toLowerCase();
		// Extraemos de la cadena la version de IE
		var version = parseInt(ie.split('msie')[1]);
		switch(version){
		case 6:document.write('<div id="notificacionA">La versión de tu navegador (Internet Explorer 6) es  obsoleta  y podría estar causando problemas para visualizar la página correctamente <a href="http://windows.microsoft.com/es-mx/internet-explorer/download-ie"> clic aquí para actualizar.</a></br>Si esto no lo solucionara desactiva el modo de compatibilidad, dando clic en el icono similar al de la imagen, que se encuentran en la parte superior, por favor. <img src="http://res2.windows.microsoft.com/resbox/en/windows%207/main/d9200352-db57-481d-b400-9f3d9a6d2174_24.jpg"></div>');				
		break;
		case 7:document.write('<div id="notificacionA">La versión de tu navegador (Internet Explorer) es  obsoleta  y podría estar causando problemas para visualizar la página correctamente <a href="http://windows.microsoft.com/es-mx/internet-explorer/download-ie"> clic aquí para actualizar.</a></br>Si esto no lo solucionara desactiva el modo de compatibilidad, dando clic en el icono similar al de la imagen, que se encuentran en la parte superior, por favor. <img src="http://res2.windows.microsoft.com/resbox/en/windows%207/main/d9200352-db57-481d-b400-9f3d9a6d2174_24.jpg"></div>');
		break;
		case 8:document.write('<div id="notificacionA">La versión de tu navegador (Internet Explorer 8) es  obsoleta  y podría estar causando problemas para visualizar la página correctamente <a href="http://windows.microsoft.com/es-mx/internet-explorer/download-ie"> clic aquí para actualizar.</a></br>Si esto no lo solucionara desactiva el modo de compatibilidad, dando clic en el icono similar al de la imagen, que se encuentran en la parte superior, por favor. <img src="http://res2.windows.microsoft.com/resbox/en/windows%207/main/d9200352-db57-481d-b400-9f3d9a6d2174_24.jpg"></div>');
		break;
		default: 
		break;
		}}
	
	 function muestra()
	 {
		var elems = document.getElementsByClassName("n_stock_market_wrapper");
		for(var i = 0; i != elems.length; ++i)
		{
			elems[i].style.visibility = "visible"; 
		}
	 }
	
</script>
<script>
$(function() {
$("#imageslider").bjqs({
width: 509,
height: 200,
animtype: "slide",
responsive: true,
automatic: true,
keyboardnav: false,
markertype: "1",
prevtext: "<img src='img/prev.jpg'>",
nexttext: "<img src='img/sig.jpg'>"
});
});
</script>
	<script>
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-40962062-1', 'auto');
ga('require', 'displayfeatures');
ga('send', 'pageview');
</script>
</html>