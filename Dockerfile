FROM python:3.13.5-alpine3.22

ENV PYTHONUNBUFFERED=1

COPY ./requirements.txt /app/requirements.txt
COPY ./backend /app/backend
COPY ./.vscode /app/.vscode
COPY ./.git /app/.git
WORKDIR /app/backend

RUN python -m venv env /app/py && \
    /app/py/bin/pip install --upgrade pip && \
    /app/py/bin/pip install -r /app/requirements.txt

ENV PATH="/app/py/bin:$PATH"

CMD ["python", "-Xfrozen_modules=off", "manage.py", "runserver", "0.0.0.0:8000"]