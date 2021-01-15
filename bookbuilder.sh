#!/bin/bash
umask 0000

# Parse parameters
PARAMS=""

while (( "$#" )); do
  case "$1" in
    -v|--verbose)
      VERBOSE=0
      shift
      ;;
    -l|--lang)
      if [ -n "$2" ] && [ ${2:0:1} != "-" ]; then
        LANG=$2
        shift 2
      else
        echo "Error: Argument for $1 is missing" >&2
        exit 1
      fi
      ;;
    -*|--*=) # unsupported flags
      echo "Error: Unsupported flag $1" >&2
      exit 1
      ;;
    *) # preserve positional arguments
      PARAMS="$PARAMS $1"
      shift
      ;;
  esac
done

# set positional arguments in their proper place
eval set -- "$PARAMS"


# If unset, set language to English (en)
LANG=${LANG:-en}
echo Language: $LANG

#  Constants
DOCS=`pwd`
DIR=_build
DIST=dist
BOOK=book
TAG=`git describe --tags --always`
TITLE=MasteringEthereumOE

RUBYDIR=/usr/lib/ruby/gems/2.4.0/gems/
ADOCFONTSDIR=/usr/lib/ruby/gems/*/gems/*/data/fonts/
TTFFONTSDIR=/usr/share/fonts/ttf-*/
ASCIIDOC_IMAGES=/etc/asciidoc/images
KINDLEGEN_PATH=/usr/bin/
KINDLEGEN_OPTS=-c2


clean () {
	if [ -d "${DIR}" ];
		then rm -r ${DIR};
	fi;
}


create_folder () {
	mkdir -p ${DIR};
	mkdir -p ${DIR}/fonts;
	cp -v -R -u images/ ${DIR};
	cp -v images/cover*png ${DIR};
	if [ -f "${DIR}/cover_oe_${LANG}.png" ]; then
		mv -v "${DIR}/cover_oe_${LANG}.png" "${DIR}/cover_oe.png";
	fi;
	cp -v -R -u code/ ${DIR};
	cp -v -u conf/* ${DIR};
}

copy_chapters () {
	cp -v -u *.asciidoc ${DIR}
	if [ -d "lang/${LANG}" ]; then
		for f in lang/${LANG}/*.txt; do
			name=$(basename $f .txt);
			cp -v lang/${LANG}/${name}.txt ${DIR}/${name}.asciidoc;
		done;
	fi;
}

copy_source () {
	mkdir -p lang/en
	for f in *.asciidoc; do
		name=$(basename $f .asciidoc);
		cp -v ${name}.asciidoc lang/en/${name}.txt;
	done;
}

tx_push () {
	tx push -s
}

tx_pull () {
	tx pull -a
}

copy_fonts () {
	echo Copying fonts
	cp -v -R -u ${TTFFONTSDIR}/*.ttf ${DIR}/fonts/
	cp -v -R -u ${ADOCFONTSDIR}/*.ttf ${DIR}/fonts/
}

compress_images () {
	cd ${DIR}/images;
	for f in *.png; do
		mogrify -verbose -depth 4 -colorspace gray -resize 504 $f;
	done;
	cd ${DOCS}

}

grayscale_images () {
	cd ${DIR}/images;
	for f in *.png; do
		mogrify -verbose -depth 4 -colorspace gray $f;
	done;
	cd ${DOCS}
}

create_pdf () {
	cd ${DIR}
	asciidoctor-pdf --trace -v -w -a pdfbuild -r asciidoctor-mathematical ${BOOK}.asciidoc
	cd ${DOCS}
}

create_dist () {
	mkdir -p ${DIST}/${LANG}
}

dist_pdf () {
	cd ${DOCS}
	cp -vu ${DIR}/${BOOK}.pdf ${DIST}/${LANG}/${TITLE}_${LANG}_${TAG}.pdf;
}

create_epub () {
	cd ${DIR}
	asciidoctor-epub3 --trace -v -w -a ebookbuild -r asciidoctor-mathematical  ${BOOK}.asciidoc
	cd ${DOCS}
}

dist_epub () {
	cd ${DOCS}
	cp -vu ${DIR}/${BOOK}.epub ${DIST}/${LANG}/${TITLE}_${LANG}_${TAG}.epub;
}


case "$1" in
	push)
		echo "Pushing English source to Transifex"
		copy_source
		tx_push
		shift
		;;
	pull)
		echo "Pulling all translations from Transifex"
		tx_pull
		shift
		;;
	docker-build)
		docker image build ${DOCS} -t bookbuilder
		shift
		;;
	docker-run)
		docker run -it -v ${DOCS}:/documents/ bookbuilder
		shift
		;;
	build)
		case "$2" in
			pdf)
				echo "Building pdf"
				clean
				create_folder
				copy_fonts
				copy_chapters
				create_pdf
				echo "Copying PDF to dist/${LANG} directory"
				create_dist
				dist_pdf
				shift
				;;
			epub)
				echo "Building epub"
				clean
				create_folder
				copy_fonts
				copy_chapters
				create_epub
				echo "Copying EPUB to dist/${LANG} directory"
				create_dist
				dist_epub
				shift
				;;
			mobi)
				echo "Building mobi"
				shift
				;;
		esac
		exit
		;;
	*)
		cat << _EOF_


Usage:

./build.sh [ -l | --lang xx ] pdf | epub | mobi

where
	xx is the 2 letter language code
	e.g. en for English, es for Spanish etc.

_EOF_
		exit 1
		;;
esac

exit 0
