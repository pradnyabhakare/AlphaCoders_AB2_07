from django.shortcuts import render

# Create your views here.
def dashboard(request):
    if request.session.get('auth_status'):
        return render(request, 'dashboard.html')
    return redirect('/')

def sos(request):
    if request.session.get('auth_status'):
        return render(request, 'SOS_PAGE.html')
    return redirect('/')