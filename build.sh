#!/bin/bash

# 기본값 설정
default_image_name="nest-base"
default_image_version="latest"

# 사용자 입력 받기 (기본값을 제공하여 입력이 없을 시 기본값 사용)
read -p "Enter Docker image name [${default_image_name}]: " image_name
image_name=${image_name:-$default_image_name}

read -p "Enter Docker image version [${default_image_version}]: " image_version
image_version=${image_version:-$default_image_version}

# 사용자 입력 받기
echo "Select build option:"
echo "1. Build Docker image"
echo "2. Build tar archive"
read -p "Enter your choice (1 or 2): " choice

# 이미지 이름과 버전 설정
IMAGE_NAME="${image_name}:${image_version}"
TAR_FILE="${image_name}_${image_version}.tar"

# 빌드 옵션에 따라 다르게 처리
if [ "$choice" -eq 1 ]; then
    # Docker 이미지 빌드
    echo "Building Docker image..."
    docker build -t $IMAGE_NAME .
    echo "Docker image '$IMAGE_NAME' built successfully."
elif [ "$choice" -eq 2 ]; then
    # tar 아카이브 빌드
    echo "Building tar archive..."
    docker build -t $IMAGE_NAME .
    docker save -o $TAR_FILE $IMAGE_NAME
    echo "Tar archive '$TAR_FILE' built successfully."
else
    echo "Invalid choice. Please enter 1 or 2."
    exit 1
fi
