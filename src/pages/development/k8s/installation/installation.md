# 쿠버네티스 설치(K8S installation)

sudo apt-get update


sudo apt-get install     ca-certificates     curl     gnupg     lsb-release


curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg


echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null


sudo apt-get update


sudo apt-get install docker-ce docker-ce-cli containerd.io




cd /etc/docker


sudo vi daemon.json 수정
"exec-opts":["native.cgroupdriver=systemd"] 추가
"insecure-registries": ["도커 레지스트리 주소] 추가 <---- 해당 도커 레지스트리에서 인증 없이 docker pull 가능

sudo systemctl daemon-reload
sudo systemctl restart docker
sudo systemctl restart kubelet






sudo apt update


sudo apt-get install -y apt-transport-https ca-certificates curl


sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg


echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list


sudo apt-get update


sudo apt-get install -y kubelet kubeadm kubectl





sudo kubeadm init --pod-network-cidr=10.244.0.0/16 --apiserver-advertise-address=172.19.215.160


mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config


kubectl apply -f https://raw.githubusercontent.com/flannel-io/flannel/master/Documentation/kube-flannel.yml


다른 노드에서 클러스터에 노드 추가 명령어 실행




curl https://raw.githubusercontent.com/kubernetes/dashboard/v2.5.0/aio/deploy/recommended.yaml -o dashboard.yaml


vi dashboard.yaml 수정
162번째 줄: name: kubernetes-dashbord -> name: cluster-admin
200번째 줄: --enable-skip-login 추가


kubectl apply -f dashboard.yaml



kubectl -n kubernetes-dashboard edit service kubernetes-dashboard
NodePort로 수정


kubectl -n kubernetes-dashboard get service kubernetes-dashboard
포트 확인

