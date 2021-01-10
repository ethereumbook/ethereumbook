# derived from asciidoctor/docker-asciidoctor by merklebloom and @aantonop
FROM alpine:latest

LABEL MAINTAINERS="Andreas M. Antonopoulos @aantonop"

# Installing package required for the runtime of
# any of the asciidoctor-* functionnalities
RUN apk add --no-cache \
    bash \
    curl \
    ca-certificates \
    findutils \
    font-bakoma-ttf \
    graphviz \
	git \
    inotify-tools \
    make \
    openjdk8-jre \
    py3-pillow \
    py-setuptools \
    python3 \
    ruby \
    ruby-mathematical \
    ttf-liberation \
    ttf-dejavu \
    unzip \
    which \
	zlib-dev \
	imagemagick

# Installing Python dependencies for additional
# functionnalities as diagrams or syntax highligthing
RUN apk add --no-cache --virtual .pythonmakedepends \
    build-base \
    python3-dev \
    py3-pip \
  && pip3 install --upgrade pip \
  && pip3 install --no-cache-dir \
    actdiag \
    'blockdiag[pdf]' \
    nwdiag \
    Pygments \
    seqdiag \
	transifex-client \
	requests \
  && apk del -r --no-cache .pythonmakedepends


ARG asciidoctor_version=2.0.12
ARG asciidoctor_pdf_version=1.5.3
ARG asciidoctor_epub_version=1.5.0.alpha.19

ENV ASCIIDOCTOR_VERSION=${asciidoctor_version} \
  ASCIIDOCTOR_PDF_VERSION=${asciidoctor_pdf_version} \
  ASCIIDOCTOR_EPUB_VERSION=${asciidoctor_epub_version}

# Installing Ruby Gems needed in the image
# including asciidoctor itself
RUN apk add --no-cache --virtual .rubymakedepends \
    build-base \
    libxml2-dev \
    ruby-dev \
  && gem install --no-document \
    "asciidoctor:${ASCIIDOCTOR_VERSION}" \
    asciidoctor-confluence \
    "asciidoctor-epub3:${ASCIIDOCTOR_EPUB_VERSION}" \
    asciidoctor-mathematical \
    asciimath \
    "asciidoctor-pdf:${ASCIIDOCTOR_PDF_VERSION}" \
    asciidoctor-revealjs \
    coderay \
    epubcheck:3.0.1 \
    haml \
    pygments.rb \
    rake \
    rouge \
    slim \
    thread_safe \
    tilt \
  && apk del -r --no-cache .rubymakedepends


RUN echo "umask 0000" > /root/.bashrc

WORKDIR /documents
VOLUME /documents

CMD ["/bin/bash"]
