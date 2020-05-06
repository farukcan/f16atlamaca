<?php
	if(!is_file("index.html"))
		die("index.html not found");
	echo file_get_contents("index.html");