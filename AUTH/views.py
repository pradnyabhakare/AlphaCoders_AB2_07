from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password
from .models import UserAuthData

# Register User
def register(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        hashed_password = make_password(password)  # Hash password
        UserAuthData.objects.create(username=username, password=hashed_password)
        return redirect('login')
    return render(request, 'register.html')

# Login User
def login(request):
    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        if username[0:3] == 'bb_':
            return redirect('/bloodbank')
            # return render(request, 'BloodBank.html')
        try:
            user = UserAuthData.objects.get(username=username)
            if user.password == password:
                request.session['auth_status'] = True
                request.session['username'] = user.username
                return redirect('/user')
            else:
                return render(request, 'login.html', {'error': 'Invalid credentials'})
        except UserAuthData.DoesNotExist:
            return render(request, 'login.html', {'error': 'User not found'})
    
    return render(request, 'login.html')
