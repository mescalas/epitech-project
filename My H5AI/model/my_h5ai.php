

<?php
    class my_H5AI
    {
        private $_tree;
        private $_path;

        public function __construct( $dir )
        {
            $this->_tree = [];
            $this->_path = $dir;
        }

        public function getTree()
        {
            return $this->_tree;
        }

        public function getPath()
        {
            return $this->_path;
        }

        public function setTree( $tree )
        {
            return $this->_tree = $tree;
        }

        public function setPath( $path )
        {
            return $this->_path = $path;
        }

        public function getFolders( $dir )
        {
            echo "<ul>";
            $folder = opendir( $dir );
            while ( $file = readdir( $folder ) )
            {
                if ( $file != "." && $file != ".." )
                {
                    $pathfile = $dir . '/' . $file;
                    if ( filetype( $pathfile ) == 'dir' )
                    {
                        echo "<div class='folder'><div class='wrapper'><div class='folder_icon'></div><li class='li' path=$pathfile>$file</li></div>" .
                        $this->getSubFolders( $pathfile ) .
                            "</div>";
                    }
                }
            }
            closedir( $folder );
            echo "</ul>";
        }

        public function getSubFolders( $dir )
        {

            $folder = opendir( $dir );
            while ( $file = readdir( $folder ) )
            {
                if ( $file != "." && $file != ".." && !empty( $file ) )
                {
                    $pathfile = $dir . '/' . $file;
                    if ( filetype( $pathfile ) == 'dir' )
                    {
                        return "<ul class='subfolders'><div class='folder'><div class='wrapper'><div class='folder_icon'></div><li class='li' path=$pathfile>$file</li></div>" . $this->getSubFolders( $pathfile ) . "</div></ul>";
                    }
                }
            }
            closedir( $folder );
        }

        public function getFiles( $dir )
        {
            $files         = array_slice( scandir( $dir ), 2 );
            $fileSize      = [];
            $fileLastModif = [];
            $path          = [];
            $totalsize     = 0;
            $folder        = opendir( $dir );
            while ( $file = readdir( $folder ) )
            {
                if ( $file != "." && $file != ".." && !empty( $file ) )
                {
                    $pathfile = $dir . '/' . $file;
                    array_push( $path, $pathfile );
                    array_push( $fileLastModif, date( "d/m/y H:i:s", filemtime( $pathfile ) ) );
                    if ( is_file( $pathfile ) )
                    {
                        array_push( $fileSize, filesize($pathfile) );
                    }
                    else if ( is_dir( $pathfile ) )
                    {
                        $folder_ = opendir( $pathfile );
                        while ( $file_ = readdir( $folder_ ) )
                        {
                            if ( $file_ != "." && $file_ != ".." && !empty( $file_ ) )
                            {
                                $pathfile_ = $pathfile . '/' . $file_;
                                if ( is_file( $pathfile_ ) )
                                {
                                    $totalsize += filesize( $pathfile_ );
                                }
                            }
                        }
                    }
                }
            }
            array_push( $fileSize, $totalsize );
            array_push( $files, $path );
            array_push( $files, $fileSize );
            array_push( $files, $fileLastModif );

            return $files;
        }

        public function getContent( $dir )
        {
            $result = file_get_contents( $dir );
            echo $result;
        }
    }

?>
